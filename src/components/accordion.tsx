import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is Akademiko RIA safe?</AccordionTrigger>
        <AccordionContent>
          Yes. We assure you that we always keep your personal information
          privately.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it ready for production?</AccordionTrigger>
        <AccordionContent>
          As of now, <b>No.</b> This project is still{" "}
          <span className="underline">under development</span>, but the
          developer &quot;Quin Suedad&quot; is on his move to finish it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What are the features that we can use in this project?
        </AccordionTrigger>
        <AccordionContent>
          The developer has decided to make a Post, Delete, Update, Filtering
          and more features that will be implemented in this project&#33;
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Is it required to make an account?</AccordionTrigger>
        <AccordionContent>
          <b>Yes.</b> In order to post, and read in this Application, it is a
          must to create an account beforehand.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          Can other developers contribute in this project?
        </AccordionTrigger>
        <AccordionContent>
          <b>Yes&#33;</b> You can visit the source code of this project in
          &quot;Quin Suedad&#39;s&quot; Github account. However, the lead
          developer of this project has currently set the visibility of this
          repository in private and will set it public soon.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
