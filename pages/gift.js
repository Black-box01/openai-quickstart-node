import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [gender, setGender] = useState('man');
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(15);
  const [priceMax, setPriceMax] = useState(200);
  const [hobbies, setHobbies] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading){
      return;
    }
    setLoading(true);

    try{
      const response = await fetch("/api/generate-gift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          priceMin, priceMax, age, gender, hobbies}),
      });
      const data = await response.json();
      setResult(data.result.replaceAll('\n', '<br />'));
    } catch(e){
      alert('Failed to generate gift ideas, Check Internet Connection and try again');
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className={styles.overAll}>
      <Head>
        <title>GIFT IDEA GENERATOR</title>
        <link rel="icon" href="/bb.gif" />
      </Head>

      <main className={styles.main}>
      {!loading && (
      <div className={styles.name}>
        <h1 className={styles.hea}>GIFT IDEA GENERATOR</h1>
        <div className={styles.img}>
          <img src="/fr.png"/>
        </div>
      </div>)}
        {!loading  && (<form onSubmit={onSubmit}>
          <label>Who is the gift for?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Price from</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Enter the minimum price"
            value={priceMin}
            onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
          />

          <label>Price to</label>
          <input
            type="number"
            min={1}
            name="priceMax"
            placeholder="Enter the maximum price"
            value={priceMax}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Hobbies</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Enter the hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate gift ideas" />
        </form>)}
        {loading && (
          <div className="box">
            <h3>Looking for the best gift ideas 🎁 💡</h3>
            <img src="/bb.gif" className={styles.loading} />
          </div>
        )}
        {result && (
          <div className={styles.re}>
          <img src="/arr.png" className={styles.arr}/>
            <div 
            className={styles.result}
            dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>)}
      </main>

      <footer className={styles.foo}>
        <label>
          Developed by KACHI
        </label>
      </footer>
    </div>
  );
}
