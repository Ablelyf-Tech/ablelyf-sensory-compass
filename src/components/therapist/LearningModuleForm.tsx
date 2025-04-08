
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const moduleSchema = z.object({
  title: z.string().min(2, { message: "Title is required." }),
  description: z.string().min(10, { message: "Description should be at least 10 characters." }),
  skillArea: z.string().min(1, { message: "Skill area is required." }),
  targetAgeMin: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: "Age must be a positive number.",
  }),
  targetAgeMax: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: "Age must be a positive number.",
  }),
  activities: z.array(
    z.object({
      title: z.string().min(2, { message: "Activity title is required." }),
      description: z.string().min(5, { message: "Activity description is required." }),
      duration: z.string().min(1, { message: "Duration is required." }),
      materials: z.string(),
    })
  ).min(1, { message: "At least one activity is required." }),
  suitableFor: z.array(z.string()).min(1, { message: "Select at least one condition." }),
  resources: z.array(
    z.object({
      title: z.string().min(2, { message: "Resource title is required." }),
      url: z.string().url({ message: "Please enter a valid URL." }),
      type: z.string(),
    })
  ).optional(),
});

type ModuleFormValues = z.infer<typeof moduleSchema>;

export function LearningModuleForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      description: "",
      skillArea: "",
      targetAgeMin: "3",
      targetAgeMax: "12",
      activities: [
        {
          title: "",
          description: "",
          duration: "",
          materials: "",
        },
      ],
      suitableFor: [],
      resources: [
        {
          title: "",
          url: "",
          type: "pdf",
        },
      ],
    },
  });

  function onSubmit(data: ModuleFormValues) {
    toast({
      title: "Learning module created",
      description: `"${data.title}" module has been created successfully.`,
    });
    console.log(data);
    setOpen(false);
    form.reset();
  }

  function addActivity() {
    const activities = form.getValues("activities");
    form.setValue("activities", [
      ...activities,
      { title: "", description: "", duration: "", materials: "" },
    ]);
  }

  function removeActivity(index: number) {
    const activities = form.getValues("activities");
    if (activities.length > 1) {
      form.setValue(
        "activities",
        activities.filter((_, i) => i !== index)
      );
    }
  }

  function addResource() {
    const resources = form.getValues("resources") || [];
    form.setValue("resources", [
      ...resources,
      { title: "", url: "", type: "pdf" },
    ]);
  }

  function removeResource(index: number) {
    const resources = form.getValues("resources") || [];
    form.setValue(
      "resources",
      resources.filter((_, i) => i !== index)
    );
  }

  const conditionItems = [
    { value: "autism", label: "Autism Spectrum Disorder" },
    { value: "adhd", label: "ADHD" },
    { value: "sensory", label: "Sensory Processing Disorder" },
    { value: "developmental", label: "Developmental Delay" },
    { value: "learning", label: "Learning Disability" },
    { value: "physical", label: "Physical Disability" },
    { value: "speech", label: "Speech/Language Delay" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-ablelyf-blue-500">
          <Book className="mr-2 h-4 w-4" />
          Create Module
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Learning Module</DialogTitle>
          <DialogDescription>
            Design educational content for therapeutic purposes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Social Communication Basics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the learning module and its objectives"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="skillArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Skill Area</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Skills</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="sensory">Sensory Regulation</SelectItem>
                          <SelectItem value="motor">Motor Skills</SelectItem>
                          <SelectItem value="cognitive">Cognitive Skills</SelectItem>
                          <SelectItem value="adaptive">Adaptive Skills</SelectItem>
                          <SelectItem value="emotional">Emotional Regulation</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="targetAgeMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Age</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAgeMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Age</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="suitableFor"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Suitable For</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Select conditions this module is designed to help with.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {conditionItems.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="suitableFor"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Activities</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addActivity}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Activity
                </Button>
              </div>

              {form.watch("activities").map((_, index) => (
                <Card key={index} className="border border-border">
                  <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Activity {index + 1}</CardTitle>
                    {form.watch("activities").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeActivity(index)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 py-0 px-6 pb-6">
                    <FormField
                      control={form.control}
                      name={`activities.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Creating a Social Story" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`activities.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed instructions for this activity"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`activities.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5-10min">5-10 minutes</SelectItem>
                                  <SelectItem value="10-15min">10-15 minutes</SelectItem>
                                  <SelectItem value="15-30min">15-30 minutes</SelectItem>
                                  <SelectItem value="30-45min">30-45 minutes</SelectItem>
                                  <SelectItem value="45-60min">45-60 minutes</SelectItem>
                                  <SelectItem value="60min+">Over 60 minutes</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`activities.${index}.materials`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Materials Needed</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Paper, markers, scissors" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Additional Resources</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addResource}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Resource
                </Button>
              </div>

              {form.watch("resources")?.map((_, index) => (
                <Card key={index} className="border border-border">
                  <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Resource {index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeResource(index)}
                      className="h-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4 py-0 px-6 pb-6">
                    <FormField
                      control={form.control}
                      name={`resources.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resource Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Visual Communication Cards PDF" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`resources.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input 
                              type="url" 
                              placeholder="https://example.com/resource" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`resources.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resource Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">PDF Document</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="audio">Audio</SelectItem>
                                <SelectItem value="website">Website/Article</SelectItem>
                                <SelectItem value="image">Images/Graphics</SelectItem>
                                <SelectItem value="app">Application/Software</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Module</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
