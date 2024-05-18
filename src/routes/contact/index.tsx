import { $, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import { email, type Input, minLength, object, string } from "valibot";
import { nanoid } from "nanoid";
import { css } from "~/styled-system/css";
import { center, grid } from "~/styled-system/patterns";

export const ContactFormSchema = object({
  name: string([minLength(1, "Please tell me your name.")]),
  email: string([
    minLength(1, "Please tell me your email."),
    email("The email address seems wrong."),
  ]),
  message: string([minLength(1, "Please leave me a message.")]),
});

export type ContactForm = Input<typeof ContactFormSchema>;

export type ContactFormResponse = {
  submissionId?: string;
};

export type ContactFormSubmission = ContactForm & {
  submitDate: Date;
};

export const storeFormSubmission = async (
  platform: QwikCityPlatform,
  submission: ContactFormSubmission
) => {
  if (!platform.env) {
    throw new Error("No platform environment found.");
  }
  const kvStore = platform.env.KV as KVNamespace | undefined;
  if (!kvStore) {
    throw new Error("No KV namespace set.");
  }
  const submissionId = `contactform:submission:${nanoid()}`;
  await kvStore.put(submissionId, JSON.stringify(submission));
  console.debug("new kv store list");
  console.dir(await kvStore.list());
  return submissionId;
};

export const useContactFormLoader = routeLoader$<InitialValues<ContactForm>>(
  () => ({
    name: "",
    email: "",
    message: "",
  })
);

export const useContactFormAction = formAction$<
  ContactForm,
  ContactFormResponse
>(async (values, { platform }) => {
  const submission: ContactFormSubmission = {
    ...values,
    submitDate: new Date(),
  };
  const submissionId = await storeFormSubmission(platform, submission).catch(
    (err) => {
      console.error(
        "Error storing form submission",
        err,
        "submission",
        submission
      );
      return null;
    }
  );
  if (!submissionId) {
    return {
      status: "error",
      message: "Sorry, something went wrong. Please try again later.",
    };
  }
  console.debug("stored form submission", submissionId, submission);
  return {
    status: "success",
    message: `Hi ${submission.name}! Thank you for your message. I will get back to you as soon as possible.`,
    data: { submissionId },
  };
}, valiForm$(ContactFormSchema));

export default component$(() => {
  const [contactForm, { Form, Field }] = useForm<
    ContactForm,
    ContactFormResponse
  >({
    loader: useContactFormLoader(),
    action: useContactFormAction(),
    validate: valiForm$(ContactFormSchema),
  });
  const handleSubmit = $<SubmitHandler<ContactForm>>(() => {
    console.log("submitting form...");
  });

  return (
    <>
      <h1>Contact</h1>
      <div class="box">
        <p>{`Work in progress! Contact form works though :-)`}</p>
      </div>
      <br />
      <div class="box">
        <Form
          onSubmit$={handleSubmit}
          class={[center({}), grid({ gridTemplateColumns: "150px 1fr" })]}
        >
          <label for="name">Name</label>
          <Field name="name">
            {(field, props) => (
              <div>
                <input {...props} value={field.value} name="name" />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <label for="email">E-Mail</label>
          <Field name="email">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  type="email"
                  value={field.value}
                  name="email"
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <label for="message">Message</label>
          <Field name="message">
            {(field, props) => (
              <div>
                <input {...props} value={field.value} name="message" />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <button type="submit" class={css({ justifyContent: "center" })}>
            Hit me up
          </button>
        </Form>
      </div>
      {contactForm.response.message && (
        <>
          <br />
          <div class="box">
            <p>{contactForm.response.message}</p>
          </div>
        </>
      )}
      <br />
      <a href="https://www.buymeacoffee.com/peterunger" target="_blank">
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          height={60}
          width={217}
        />
      </a>
    </>
  );
});

export const head: DocumentHead = {
  title: "Contact Peter",
  meta: [
    {
      name: "description",
      content: "Get in contact with me - Peter Unger",
    },
  ],
};
