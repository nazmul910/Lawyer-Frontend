const SideImage = () => {
  return (
    <>
      <div className="w-1/2 relative flex items-center justify-center bg-black">
        <img
          src="/image/login.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
        <div className="absolute text-white space-y-5 text-center px-4">
          <h1 className="text-4xl  font-bold md:text-5xl text-justify">
            Welcome to <br /> Justice Portal
          </h1>
          <p>Secure client & case management for professionals</p>
        </div>
      </div>
    </>
  );
};

export default SideImage;
