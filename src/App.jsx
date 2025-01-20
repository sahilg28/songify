import { AiOutlineSpotify } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

function App() {
  const [URL, setURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value);
    setErrorMessage(""); // Clear previous errors when URL changes
  };

  console.log(URL);

  const downloadSong = async () => {
    setURL("");
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: `${URL}`
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      window.location.href = response.data.downLoadLink;
    } catch (error) {
      console.log(error);
      setErrorMessage("Daily API limit reached. Please try again later!");
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center flex-col gap-y-5">
      <div className="flex items-center justify-center gap-x-2">
        <AiOutlineSpotify size={35} className="bg-green-700 rounded-full" />
        <h1 className="text-xl font-semibold text-white">Songify</h1>
      </div>

      <div className="flex flex-col items-center gap-y-3">
        <div>
          <input
            type="url"
            className="h-8 w-[450px] text-black rounded-md p-2 border-none outline-none"
            onChange={handleURL}
            value={URL}
          />
          <button
            className="bg-green-600 h-8 px-2 rounded-md m-1 font-semibold text-black hover:bg-green-700"
            onClick={downloadSong}
          >
            Download
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default App;