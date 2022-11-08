import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";
import Loading from "../components/Loader";
const Index = () => {
  const options = useMemo(() => countryList().getData(), []);
  const [selected, setSelected] = useState();
  const [news, setNews] = useState();
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  let length = news?.length;
  const getNews = (searchQuery) => {
    if (!searchQuery) return null;
    setNews();

    const options = {
      method: "GET",
      url: "https://real-time-news-data.p.rapidapi.com/search",
      params: { query: searchQuery, lang: "en" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_NEWS_API_KEY_SCRAPPER,
        "X-RapidAPI-Host": "real-time-news-data.p.rapidapi.com",
      },
    };
    setLoading(true);
    axios.request(options).then((res) => {
      let data = res.data.data;
      setNews(
        data.map((item) => {
          return {
            author: item.source_logo_url,
            publishedAt: item.published_datetime_utc,
            source: item.source_url,
            title: item.title,
            url: item.link,
            image: item.photo_url,
          };
        })
      );
    });
    setLoading(false);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <div
        className={`${
          length
            ? "flex flex-col justify-center items-center gap-4 mt-6 "
            : "flex flex-col justify-center items-center gap-4 mt-6 h-screen  "
        }`}
      >
        {loading ? <Loading /> : null}
        <div className="form-control">
          <div className="input-group">
            <select className="select select-bordered" onChange={handleChange}>
              <option disabled selected>
                Pick country or Search
              </option>
              {options.map((item) => (
                <option key={item.value} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
            <button className="btn" onClick={() => getNews(selected)}>
              Go
            </button>
          </div>
        </div>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-square" onClick={() => getNews(search)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        {news?.length != 0 ? (
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {news?.map((item, i) => {
              console.log(item);
              return (
                <div
                  className="card w-96 bg-base-100 shadow-xl image-full"
                  key={i}
                >
                  <figure className="w-[380px] h-[250px]">
                    <img
                      src={item.image || "https://myshort.io/s/4Qvq1"}
                      alt="hello"
                      width={380}
                      height={216}
                    />
                  </figure>
                  <div className="card-body">
                    {/* <im className="card-title">{item.source.name}</im> */}
                    <p>{item.title}</p>
                    <div className="card-actions justify-end">
                      <a
                        href={item.url}
                        target="_blank"
                        className="btn btn-primary"
                        rel="noreferrer"
                      >
                        Read Now{" "}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-screen ">
            <h2 className="text-4xl">No Articles</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
