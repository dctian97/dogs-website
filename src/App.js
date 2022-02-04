import { useEffect, useState } from "react";
import { fetchImages } from "./api";


function Header() {
  return (
  <section class="hero is-info">
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">

        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item is-active">
            <a href="https://github.com/">Github</a>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>


  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">
        Search your favorite dogs
      </p>
    </div>
  </div>


  <div class="hero-foot">
    <nav class="tabs">
          <div class="container">
            <ul>
            <li class="column">
              <a href="https://www.youtube.com/results?search_query=%E7%8A%AC">Dogs video</a></li>
            <li class="column"><a href="https://en.wikipedia.org/wiki/秋田犬">Dog's data</a></li>
            <li class="column"><a href="https://www.min-breeder.com/magazine/14973">Dogs for you</a></li>
            </ul>
          </div>
    </nav>
  </div>
</section>
  );
}


function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <button class="button is-dark is-loading">Loading</button>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
              <input className="input is-dark is-rounded" name="breed" placeholder="Please input lowercase letters" type="search" ></input>
          </div>
          <div className="control">
            <button class="button is-dark is-rounded">
              Search
          </button>
          </div>
        </div>
        </form>
    </div>
  );
}

function HeadFooter(){
  return(
    
    <div class="notification is-danger is-light">
      Be sure to use this site when you want to feed a dog.
    </div>
    
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
            <section className="section">
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}



function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}





function App() {
  return (
    <div>
      <Header />
      <HeadFooter />
      <Main />
      <Footer />
    </div>
  );
}

export default App;