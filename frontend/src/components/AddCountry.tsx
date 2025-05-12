import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useAddCountryMutation,
  useGetContinentsQuery,
} from "@/lib/graphql/generated/graphql-types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Country name must be at least 2 characters.",
  }),
  emoji: z.string().min(1, {
    message: "Emoji is required.",
  }),
  code: z.string().length(2, {
    message: "Country code must be exactly 2 characters.",
  }),
  continent: z
    .string({
      required_error: "Please select a continent.",
    })
    .regex(/^\d+$/, {
      message: "Invalid continent ID.",
    }),
});

type AddCountryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddCountry({ open, onOpenChange }: AddCountryDialogProps) {
  const { data: continentsData } = useGetContinentsQuery();
  const [addCountry] = useAddCountryMutation({
    refetchQueries: ["GetCountries"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emoji: "",
      code: "",
      continent: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addCountry({
        variables: {
          data: {
            name: values.name,
            emoji: values.emoji,
            code: values.code.toUpperCase(),
            continent: {
              id: parseInt(values.continent),
            },
          },
        },
      });

      toast.success("Country added successfully!");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add country. Please try again.");
      console.error("Error adding country:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Add Country</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add country</DialogTitle>
          <DialogDescription>Add a new country to the list</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emoji</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country emoji" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="continent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Continent</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a continent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {continentsData?.continents.map((continent) => (
                        <SelectItem
                          key={continent.id}
                          value={continent.id.toString()}
                        >
                          {continent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="bg-blue-600 hover:bg-blue-700" type="submit">
                Add Country
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
