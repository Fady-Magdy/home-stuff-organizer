let Api = "";
if (window.location.hostname.includes("localhost")) {
  Api = "http://localhost:443";
} else {
  Api = "https://hso-server-fady-m.vercel.app";
}

export default Api;
