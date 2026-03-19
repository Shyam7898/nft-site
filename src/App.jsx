import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(1243);
  const [tasks, setTasks] = useState({
    like: false,
    retweet: false,
    follow: false
  });

  useEffect(() => {
    const counter = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(counter);
  }, []);

  const handleTask = (type, url) => {
    window.open(url, "_blank");
    setTasks((prev) => ({ ...prev, [type]: true }));
  };

  const allDone = tasks.like && tasks.retweet && tasks.follow;

  const joinWhitelist = async () => {
    if (!allDone) {
      alert("Complete all tasks first!");
      return;
    }

    const username = prompt("Enter your Twitter username");
    if (!username) return;

    await fetch("http://localhost:5000/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    });

    alert("🎉 Whitelisted!");
  };

  return (
  <>
    <div style={styles.bgGlow}></div> {/* 👈 YE ADD KARNA HAI */}

    <div style={styles.container}>

      {/* 🔥 NAVBAR */}
      <div style={styles.nav}>
        <h2 style={{ letterSpacing: "2px" }}>🔥 META DROP</h2>
        <button style={styles.navBtn}>Connect Wallet</button>
      </div>

      {/* 🔥 HERO SECTION */}
      <div style={styles.hero}>
         <h1 style={styles.title}>
          MEME GODS NEXT BIG <br /> NFT COLLECTION
        </h1>
         <p style={{ marginTop: "10px", opacity: 0.5 }}>
            Mint starts soon • Limited 2222 NFTs
         </p>
        <p style={styles.subtitle}>
          Limited supply. Exclusive whitelist. Don’t miss out.
        </p>

        <p style={styles.counter}>
          {count}+ already joined
        </p>
      </div>

      {/* 🔥 TASK CARD */}
      <div style={styles.card}>
        <h3>Complete Tasks</h3>

        <button style={styles.taskBtn} onClick={() =>
          handleTask("like", "https://twitter.com/intent/like?tweet_id=2034499011613429955")
        }>
          👍 Like Tweet {tasks.like && "✅"}
        </button>

        <button style={styles.taskBtn} onClick={() =>
          handleTask("retweet", "https://twitter.com/intent/retweet?tweet_id=2034499011613429955")
        }>
          🔁 Retweet {tasks.retweet && "✅"}
        </button>

        <button style={styles.taskBtn} onClick={() =>
          handleTask("follow", "https://twitter.com/intent/follow?screen_name=memegodsnftart")
        }>
          👤 Follow {tasks.follow && "✅"}
        </button>

        <button
          onClick={joinWhitelist}
          style={{
            ...styles.mainBtn,
            background: allDone
              ? "linear-gradient(90deg,#ff00cc,#3333ff)"
              : "#444"
          }}
        >
          {allDone ? "Join Whitelist" : "Complete All Tasks"}
        </button>
      </div>

    </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f0f1a, #050508)",
    color: "#fff",
    fontFamily: "Orbitron, sans-serif",
    overflow: "hidden"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px"
  },

  navBtn: {
    background: "linear-gradient(90deg,#ff00cc,#3333ff)",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(255,0,200,0.6)"
  },

  hero: {
  textAlign: "center",
  marginTop: "80px",
  padding: "0 15px" // ✅ mobile + small screen fix
},

  title: {
  fontSize: "clamp(28px, 5vw, 48px)", // ✅ responsive size
  background: "linear-gradient(90deg,#fff,#ff00cc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  textAlign: "center",
  padding: "0 20px", // ✅ side space
  lineHeight: "1.2",
  wordBreak: "break-word" // ✅ cut fix
},

  subtitle: {
    opacity: 0.6,
    marginTop: "10px",
    fontSize: "16px"
  },

  counter: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#ff00cc",
    textShadow: "0 0 10px rgba(255,0,200,0.7)"
  },

  card: {
  margin: "60px auto",
  padding: "35px",
  width: "340px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  boxShadow: "0 0 60px rgba(255,0,200,0.3)",
  textAlign: "center",
  transition: "0.4s",
  animation: "floatCard 4s ease-in-out infinite"
},

  taskBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },

  mainBtn: {
  width: "100%",
  marginTop: "20px",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  animation: "pulseGlow 2s infinite"
},
  
  bgGlow: {
  position: "fixed",
  top: "-200px",
  left: "-200px",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, rgba(255,0,200,0.3), transparent)",
  filter: "blur(120px)",
  animation: "moveGlow 10s infinite alternate",
  zIndex: 0
}
};

export default App;