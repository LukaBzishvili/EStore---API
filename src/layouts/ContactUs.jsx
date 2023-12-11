import Input from "../components/other/Input";

const ContactUs = () => {
  return (
    <section className="w-full flex items-center justify-center text-white my-[80px]">
      <div className="max-w-screen-2xl h-[340px] w-full bg-[#5959D9] flex flex-col items-center justify-center gap-[20px] px-[30px] rounded-md">
        <div className="w-4/6">
          <h2 className="w-full text-start font-bold text-[14px] md:text-[18px] mt-[20px]">
            Yes!
          </h2>
          <h3 className="w-full text-start font-medium text-[14px] md:text-[18px]">
            Send me exclusive offers, unique gift ideas, and personalized <br />
            tips for shopping and selling on Commerce.
          </h3>
        </div>
        <Input text={"Subscribe"}></Input>
        <p className="underline cursor-pointer">
          first order only. You're ready?
        </p>
      </div>
    </section>
  );
};
export default ContactUs;
