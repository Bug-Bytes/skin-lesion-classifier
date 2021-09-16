import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [targetImage, setTargetImage] = useState(null);
  const [inferences, setInferences] = useState({});

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setTargetImage(URL.createObjectURL(file))
    
    const data = new FormData();
    data.append("file", file);
    const response = await fetch(`${process.env.server}/inference`, {
      method: "POST",
      body: data
    })
    const {inference} = await response.json();
    setInferences(inference);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>What bit you?</title>
        <meta name="description" content="Skin Laceration Detector" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://www.youtube.com/watch?v=mm-6xt2W1mA">Bug Bytes</a>
        </h1>


        <div className={styles.input_section}>
          {targetImage && <img src={targetImage} className={styles.target_image}/>}

        </div>

        <div className={styles.inference_section}>
          {Object.keys(inferences).length > 0 && (
            <div className={styles.inferences}>
              <h1>Likelihoods</h1>
              {Object.keys(inferences).map(bite_type => (
                <p key={bite_type} >{`${bite_type}:${inferences[bite_type]}%`}</p>
              ))}
            </div>
          )}
        </div>

        <form className={styles.uploadForm}>
          <input type="file" onChange={(e) => handleFile(e)} />
        </form>
        
        {!targetImage && (
          <p className={styles.intro}>
            Bug Bytes is a community project that aims to provide a 
            <a href="https://en.wikipedia.org/wiki/Skin_laceration">
              {" skin laceration "}
            </a>
            detection algorithm that delivers a likelihood of whether a lesion is
            a bug bite. The project is in progress, and we'd love to hear
            feedback.
          </p>
        )}
      </main>
    </div>
  );
}
