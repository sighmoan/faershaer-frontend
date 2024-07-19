import { SignInButton } from "@clerk/clerk-react";
import mountains from "./assets/mountains.jpg";
import picnic from "./assets/picnic.jpg";
import boardgames from "./assets/board-games.jpg";
import cats from "./assets/cats.jpg";
import tramwoman from "./assets/tram-woman.jpg";
import accountant from "./assets/accountant.jpg";
import lumberjack from "./assets/lumberjack.jpg";
import yogacouple from "./assets/yoga-couple.jpg";

const IndexPage = () => {
  return (
    <>
      <div className="flex flex-col h-lvh">
        <div className="bg-primary hero min-h-60">
          <div>
            <h2 className="text-primary-content text-2xl text-center">
              When it ain't right to go Dutch --
            </h2>
            <br></br>
            <h1 className="text-primary-content text-4xl text-center">
              Go Swedish.
            </h1>
          </div>
        </div>
        <main className="mx-auto w-full grow">
          <div className="carousel space-x-4 h-full w-full">
            <div id="slide1" className="carousel-item relative w-full pb-20">
              <div className="w-xl mx-auto">
                <div className="w-800 h-3/6">
                  <h3 className="text-center text-3xl my-20">
                    Whenever you're doing something with your friends --
                  </h3>
                  <div className="flex flex-col">
                    <div className="card card-side card-bordered w-full h-1/4 shadow-xl">
                      <figure className="w-56">
                        <img src={picnic} />
                      </figure>
                      <h4 className="card-title ml-10">
                        Like having a picnic...
                      </h4>
                    </div>
                    <div className="card card-side card-bordered w-full shadow-xl">
                      <figure className="w-56 justify-right align-right">
                        <img src={mountains} />
                      </figure>
                      <h4 className="card-title  ml-10">
                        Spending a weekend in the mountains...
                      </h4>
                    </div>

                    <div className="card card-side card-bordered w-full h-1/4 shadow-xl">
                      <figure className="w-56">
                        <img src={boardgames} />
                      </figure>

                      <h4 className="card-title ml-10">
                        Or just having a board game night after work.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <div className="w-xl mx-auto">
                <h3 className="text-center text-3xl my-20">
                  Figuring out who's paid how much, and for what, can be a
                  headache.
                </h3>
                <div className="relative">
                  <img className="rounded" src={cats} />
                  <div className="absolute bottom-10 w-full px-10">
                    <div className="chat chat-start text-2xl">
                      <div className="chat-bubble my-10">
                        Wait, you brought the wine?
                      </div>
                    </div>
                    <div className="chat chat-end text-2xl ">
                      <div className="chat-bubble bg-primary my-10">
                        Who paid for those wonderful strawberries?
                      </div>
                    </div>
                    <div className="chat chat-start text-2xl ">
                      <div className="chat-bubble  my-10">
                        How much did we tip the pizza guy?
                      </div>
                    </div>
                    <div className="chat chat-end text-2xl ">
                      <div className="chat-bubble bg-primary my-10">
                        Does anyone remember what the taxi cost?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <div className="w-xl mx-auto">
                <h3 className="text-center text-3xl my-20">
                  And it's not always the most equal distribution that's the
                  most fair.
                </h3>
                <div className="flex flex-wrap max-w-xl justify-between content-around mx-auto">
                  <div>
                    <div className="avatar w-64">
                      <div className="mask mask-squircle">
                        <img src={lumberjack} />
                      </div>
                    </div>
                    <p className="text-2xl text-center">
                      Jakub doesn't eat meat!
                    </p>
                  </div>
                  <div className="my-20">
                    <div className="avatar w-64">
                      <div className="mask mask-squircle">
                        <img src={yogacouple} />
                      </div>
                    </div>
                    <p className="text-2xl text-center">
                      John and Sheila
                      <br />
                      don't drink!
                    </p>
                  </div>
                  <div className="-my-20">
                    <div className="avatar w-64">
                      <div className="mask mask-squircle">
                        <img src={tramwoman} />
                      </div>
                    </div>
                    <p className="text-2xl text-center">
                      Jess was only there
                      <br />
                      for a day!
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl text-center">
                      Markus just lost his job!
                    </p>
                    <div className="avatar w-64">
                      <div className="mask mask-squircle">
                        <img src={accountant} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <div className="w-xl mx-auto flex flex-col h-full justify-evenly">
                <h3 className="text-center text-3xl my-20 leading-loose">
                  With FärShär, you can
                  <ul>
                    <li>💸 track expenses 💱</li>
                    <li>🤝 transparently agree on how to share them 🫶</li>
                    <li>➗ easily calculate who should pay whom back 🏧💰</li>
                  </ul>
                </h3>
                <h4 className="text-center text-2xl">Ready to Shär Fär?</h4>
                <SignInButton>
                  <button className="btn btn-primary btn-lg">
                    Sign Up or Sign In
                  </button>
                </SignInButton>
              </div>

              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default IndexPage;
