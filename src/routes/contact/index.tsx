import { $, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import { email, type Input, minLength, object, string } from "valibot";
import { nanoid } from "nanoid";
import { css } from "~/styled-system/css";
import { center, grid } from "~/styled-system/patterns";
// import { getKVNamespace } from "~/utils/cloudflare-workers";

export const ContactFormSchema = object({
  name: string([minLength(1, "Please tell me your name.")]),
  email: string([
    minLength(1, "Please tell me your email."),
    email("The email address seems wrong."),
  ]),
  message: string([minLength(1, "Please leave me a message.")]),
});

export type ContactForm = Input<typeof ContactFormSchema>;

export type ContactFormSubmission = ContactForm & {
  submitDate: Date;
};

export const storeFormSubmission = async (
  platform: QwikCityPlatform,
  submission: ContactFormSubmission
) => {
  if (!platform.env) {
    console.warn("Platform env not set. Cannot store form submission.");
    return undefined;
  }
  const MY_KV = platform.env.KV as KVNamespace;
  const submissionId = `contactform:submission:${nanoid()}`;
  await MY_KV.put(submissionId, JSON.stringify(submission));
  console.debug("new kv store list");
  console.dir(await MY_KV.list());
  return submissionId;
};

export const useFormLoader = routeLoader$<InitialValues<ContactForm>>(() => ({
  name: "",
  email: "",
  message: "",
}));

export const useFormAction = formAction$<ContactForm>(async (values, { platform }) => {
  console.log("got form data:", values);
  console.log("platform", platform.env);
  const submitId = await storeFormSubmission(platform, { ...values, submitDate: new Date() });
  console.log("stored form submission", submitId);
}, valiForm$(ContactFormSchema));

export default component$(() => {
  const [, { Form, Field }] = useForm<ContactForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(ContactFormSchema),
  });
  const handleSubmit = $<SubmitHandler<ContactForm>>((values, event) => {
    console.log("submitting form", values, event);
  });

  return (
    <>
      <h1>Contact</h1>
      <div class="box">
        <p>Work in progress! Contact form is not hooked up yet..</p>
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
