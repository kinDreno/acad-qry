const Page = () => {
  // ALL POSTS ARE HERE AND NOT FILTERED.
  // I am still working on the UI Designs right now in this project and will soon deploy this for beta testing
  // will work soon on database and querying!
  return (
    <>
      <main className="overflow-y-scroll h-full w-[80%] flex justify-center items-center">
        <article className="h-full w-[70%] border-l-2 border-r-2 space-y-4">
          <div>John Doe &#8226; 4 Days Ago &#8226; BSCS 1-1</div>
          <section className="h-full w-full text-left">
            <h4 className="font-bold">Title Example Here</h4>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque culpa labore, ullam itaque dolore temporibus eius
              obcaecati sit sapiente praesentium iste dolorem est tenetur
              debitis laudantium maiores illo, ratione voluptate?
            </h6>
          </section>
        </article>
      </main>
    </>
  );
};

export default Page;
