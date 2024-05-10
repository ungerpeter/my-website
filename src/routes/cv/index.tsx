import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>CV Peter Unger</h1>
      <h2>Who am I?</h2>
      <div class="article">
        <p>
          As a Senior Software Engineer and Tech Lead at a leading IT company, I
          excel in designing in- novative software solutions, concentrating on
          Software Architecture, IT Security, and Artifi- cial Intelligence. My
          role involves leveraging cutting-edge technologies and implementing
          best practices to deliver high-quality projects, ensuring excellence
          and reliability, that meet the evolving needs of the tech industry.
        </p>
      </div>
      <h2>Professional Experience</h2>
      <div class="article">
        <section>
          <p>
            At Abraxas Informatik AG, I currently serve as a Senior Software
            Engineer on the development of enterprise-grade chatbot solutions
            with specialization in Software Archi- tecture, IT Security, and
            Artificial Intelligence. I am instrumental in creating and refining
            secure, user-friendly solutions with advanced AI capabilities to
            meet the complex needs of our clients.
          </p>
        </section>
        <section>
          <p>
            At Abraxas Informatik AG, I served as a Full Stack Developer,
            crafting enterprise applications for both frontend and backend
            needs. Our primary mission was delivering tailored software
            solutions for the public sector and government clients. I was
            instrumental in developing scalable, secure, and user-centric
            products, ensuring they aligned with stringent standards and client
            expectations.
          </p>
        </section>
        <section>
          <p>
            At coatmaster AG, I was responsible for overseeing diverse IT
            domains including network infras- tructure, cloud services, and
            hardware. I also develop customized software solutions to optimize
            our products and address customer requirements. My role involves
            ensuring seamless integration and continual refinement of IT
            processes to maintain operational efficiency and relevance in the
            changing tech environment.
          </p>
        </section>
      </div>
      <h2>Academic Credentials</h2>
      <div class="article">
        <section>
          <p>
            Together with two co-lecturers, I teach courses on modern
            cryptography and cybersecurity at FHGR in Chur. Our curriculum
            encompasses cryptographic algorithms, information security, cyber
            threats, and practical labs focused on ethical hacking.
          </p>
        </section>
        <section>
          <p>
            I earned a part-time Bachelor's in Computer Science from the School
            of Engineering, ZHAW, with a focus on information engineering and
            data science. My thesis explored separating parallel ut- terances in
            audio recordings in NLP. Simultaneously, I applied theoretical
            knowledge to practical use as a part-time Software Engineer, gaining
            insights in software development and data analysis.
          </p>
        </section>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
