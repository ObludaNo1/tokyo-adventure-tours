import Image from "next/image";

export default function Home() {
  return (
    <section className="relative w-full aspect-[1742/818] -z-10">
      <div className="absolute inset-0 ">
        <Image
          src="/images/government_building_night_tokio_view_00.webp"
          alt="A view from the Tokyo government building at night"
          fill
          className="absolute inset-0 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 pt-16 z-0">
        <div className="text-white">
          <h1 className="text-7xl text-center">Explore Tokyo without fear</h1>
          <p className="text-xl text-center mt-4">
            Welcome to the right place where you can explore Tokyo's gems.
          </p>
          <p className="text-xl text-center mt-4">
            With us you do not need to fear getting lost. We have your back!
          </p>
        </div>
      </div>
    </section>
  );
}
