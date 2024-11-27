"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { movieGenres, tvGenres } from "@/lib/api/languages";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AnimatedTabs } from "@/components/motion-ui/AnimatedBackground";
import Combobox from "../combobox";
import { Slider } from "../ui/slider";
import countries from "@/lib/api/countries";
import { generateDiscoverUrl } from "@/lib/urls";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  type: z.enum(["movie", "tv"]), // Accepts only "movie" or "tv"
  language: z.union([z.string().min(2), z.literal("")]).optional(), // Accepts any string
  with_genres: z.union([z.string().min(1), z.literal("")]).optional(), // z.array(z.number()), // Accepts an array of numbers
  rating: z.union([z.string().min(1).max(3), z.literal("")]).optional(), // Accepts a number
  primary_release_year: z
    .union([z.string().length(4), z.literal("")])
    .optional(), // Accepts a number
  with_origin_country: z
    .union([z.string().length(2), z.literal("")])
    .optional(),
});

const languages = [
  { value: "en-US", label: "English" },
  { value: "es-ES", label: "Spanish" },
  { value: "zh-CN", label: "Chinese" },
  { value: "zh-FA", label: "Persian" },
  { value: "hi-IN", label: "Hindi" },
  { value: "ar-SA", label: "Arabic" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "pt-BR", label: "Portuguese" },
];

export function DiscoverForm({
  searchParams,
}: {
  searchParams: DiscoverParams;
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: searchParams.type || "movie",
      language: searchParams.language || "",
      with_genres: searchParams.with_genres || "",
      rating: searchParams["vote_average.gte"] || "",
      primary_release_year:
        searchParams.primary_release_year ||
        searchParams.first_air_date_year ||
        "",
      with_origin_country: searchParams.with_origin_country || "",
    },
  });
  const { setValue, watch } = form;
  const type = watch("type");
  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(
      generateDiscoverUrl({
        ...values,
        "vote_average.gte": values.rating,
        first_air_date_year: "",
      }).urlForPage
    );
    console.log({
      ...values,
      "vote_average.gte": values.rating,
      first_air_date_year: "",
    });
  }
  const [list, setList] = useState<string | null>("movie");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <Button onClick={() => setValue("type", "movie")}></Button> */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AnimatedTabs
                  notLink
                  callback={(val) => {
                    //@ts-ignore
                    setValue("type", val?.toLowerCase());
                    console.log(val?.toLowerCase());
                  }}
                  TABS={[
                    {
                      label: "Movie",
                      id: "movie",
                      expandble: false,
                      items: null,
                    },
                    { label: "TV", id: "tv", expandble: false, items: null },
                  ]}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language:</FormLabel>
              <FormControl>
                <Combobox
                  items={languages}
                  field={field.value}
                  changeFieldValue={setValue}
                  fieldName={field.name}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="with_origin_country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country:</FormLabel>
              <FormControl>
                <Combobox
                  items={countries}
                  field={field.value}
                  changeFieldValue={setValue}
                  fieldName={field.name}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="with_genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre: {type}</FormLabel>
              <FormControl>
                <Combobox
                  items={type === "movie" ? movieGenres : tvGenres}
                  field={field.value}
                  changeFieldValue={setValue}
                  fieldName={field.name}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primary_release_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year: (format: YYYY)</FormLabel>
              <FormControl>
                <Input placeholder="2020" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating: {typeof field.value}</FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="mb-3"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <Slider
                    value={[parseInt(field.value || "0")]}
                    max={10}
                    onValueChange={(val) => setValue("rating", val.toString())}
                    step={0.1}
                  />
                </div>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
