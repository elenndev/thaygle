import Catalogo from "./components/Catalogo";

export default function Home() {
  if (typeof window === "undefined"){
    console.log("server")
  }else{
    console.log("client")
  }

  return (
    <>
    <div className="min-h-[fit-content] bg-gray-900 w-full h-full flex flex-col items-center justify-center">
      <Catalogo />
    </div>
    </>
  );
}
