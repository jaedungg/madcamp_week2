const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div
        className="flex flex-col justify-center items-center w-[800px] h-[480px] gap-2.5 rounded-t-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 83.65%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[453px] relative gap-12">
          {/* Logo & Title */}
          <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 relative gap-3">
            <img src="/images/logo.svg" alt="Globe Icon" width={88} />
            <p className="flex-grow-0 flex-shrink-0 w-[453px] text-[28px] font-bold text-center text-white">
              Log in to ReelRecap
            </p>
          </div>

          {/* Google login & Sign up */}
          <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 relative gap-3">
            <div className="flex cursor-pointer justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-5 py-2 rounded-full border border-white">
              <img src="images/google_logo.png" className="flex-grow-0 flex-shrink-0 w-6 h-6 object-cover" />
              <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-white">
                Continue with Google
              </p>
              <div className="flex-grow-0 flex-shrink-0 w-px h-0.5 relative overflow-hidden" />
            </div>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[453px] text-base font-semibold text-center">
              <span className="self-stretch flex-grow-0 flex-shrink-0 w-[453px] text-base font-semibold text-center text-white/70">
                Don’t have an account?{" "}
              </span>
              <span className="self-stretch cursor-pointer flex-grow-0 flex-shrink-0 w-[453px] text-base underline text-center text-white">
                Sign up for ReelRecap.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;