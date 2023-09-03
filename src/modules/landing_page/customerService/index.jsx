import { useState } from "react";
import * as Yup from "yup";
import emailjs from "emailjs-com";

export const CustomerServiceModule = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  emailjs.init("R0ggzJFJMFd5slyPr");
  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        emailjs
          .send("service_94eqnza", "template_exa42gj", {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          })
          .then((response) => {
            console.log("Email sent successfully!", response);
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div>
      <section className="bg-[url('./patternBG1.svg')] bg-cover bg-left flex md:items-start items-center justify-between md:flex-row flex-col px-5 md:px-28 gap-5 md:pt-32 pt-28 pb-10">
        <div className="w-full md:w-1/2">
          <h1 className="font-extrabold text-6xl text-[#78002C] mb-5">
            Customer Service
          </h1>
          <p className="text-2xl mb-12">
            We valued your feedback, please sent your feedback to help us grow
          </p>
        </div>
        <div className="w-full md:w-1/2 mx-0 md:mx-10">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <label htmlFor="name" className="font-bold ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={formData.name}
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full h-10 px-5"
              />
              {errors.name && <div className="text-red-500">{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="email" className="font-bold ">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full h-10 px-5"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="font-bold ">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                onChange={handleChange}
                value={formData.subject}
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full h-10 px-5"
              />
              {errors.subject && (
                <div className="text-red-500">{errors.subject}</div>
              )}
            </div>
            <div>
              <label htmlFor="message" className="font-bold ">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                onChange={handleChange}
                value={formData.message}
                className="shadow-md rounded-lg border-2 border-theme-peach text-base w-full px-5 py-2"
                rows={5}
              />
              {errors.message && (
                <div className="text-red-500">{errors.message}</div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 inline-block bg-theme-brown text-white hover:border-2 hover:border-theme-brown hover:bg-transparent hover:text-[#AE4E38] min-w-[150px] font-bold"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
