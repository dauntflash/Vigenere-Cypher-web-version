import {  NavLink, BrowserRouter as Router,Route, Routes, Link } from "react-router-dom";
import Form from "./Form";
import { useEffect,useState } from "react";

const Main = () => {
    const [alphabet, setAlphabet]=useState("abcdefghijklmnopqrstuvwxyz")
    const [key, setKey]=useState("mykey")
    const [useForeignChar, setForeignChar]= useState(true)
    const [maintainCase, setCase]= useState(true)
    const [message, setMessage]= useState("")
    const [alphabetError, setAlphabetError]= useState("")

    
    const useForeign = (e) => {
        const foreignCharacter= e.target.value;
        if (foreignCharacter === "Include"){
            setForeignChar(true);
        }
        else{
            setForeignChar(false);
        }
    }

    const handleAlphabetChange = (e) => {
        const newAlphabet = e.target.value;
        const charSet = new Set(newAlphabet.toLowerCase());
        if (charSet.size !== newAlphabet.length) {
            setAlphabetError("Alphabet cannot contains duplicate characters.")
            setTimeout(() => {
                setAlphabetError("")
            },1000)
        } else {
            setAlphabet(newAlphabet);
        }


    }
    const keyChecker = (keyToCheck, alphabetToCheck) => {
        let invalidCharacters=[];
        for (let i = 0; i < keyToCheck.length; i++) {
            if (!alphabetToCheck.includes(keyToCheck[i].toLowerCase())) {
                if (invalidCharacters.includes(keyToCheck[i])){
                    continue
                }
                invalidCharacters.push(keyToCheck[i]);
            }
        }

        if (invalidCharacters.length > 0) {
            setMessage("Key contains characters not in the alphabet: " + invalidCharacters.join(", "));
            return false;
        } else {
            setMessage(""); 
            return true;
        }
    };

    useEffect(() => {
        keyChecker(key, alphabet);
    }, [alphabet, key]); 


    const handleKeyChange = (e) => {
        const newKey = e.target.value;
        setKey(newKey);
        keyChecker(newKey, alphabet); 
    };

    const useCase = (e) => {
        if (e.target.value === "Maintain") {
            setCase(true);
        } else {
            setCase(false);
        }
    }

    return ( 
        <div className="main">
            <div className="right">
                <Router>
                    <div className="nav">
                        <NavLink to="/" className="nav-link"><h2>Encode</h2></NavLink>
                        <NavLink to="/decode" className="nav-link"><h2>Decode</h2></NavLink>
                    </div>
                    <Routes>
                        <Route path="/" element={<Form encKey={key.toLowerCase()} encAlp={alphabet.toLowerCase()} encode={true} invalidKey={message} maintainCase={maintainCase} useForeignChar={useForeignChar} />}/>
                        <Route path="/decode"element={<Form encKey={key.toLowerCase()} encAlp={alphabet.toLowerCase()}  encode={false} invalidKey={message} maintainCase={maintainCase} useForeignChar={useForeignChar}/>}/>
                        <Route path="*" element={  <div className="not-found">
                            <div className="content">
                                <h1>404 Not Found</h1>
                                <p>The page you are looking for does not exist</p>
                                <Link to={"/"} >Back to Home</Link>
                            </div>
                            
                            </div>} />
                    </Routes>
                </Router>
            </div>
            <div className="vertical-line"></div>
            <div className="left">
                <div className="form">
                    <form>
                        <label>Key:</label>
                        <input type="text" onChange={handleKeyChange}
                            value={key} />
                         {message && <div className="error">{message}</div>}
                        <label>Alphabet:</label>
                        <input type="text" onChange ={handleAlphabetChange} value={alphabet} />
                        {alphabetError && <div className="error">{alphabetError}</div>}
                        <label htmlFor="">Case Strategy:</label>
                        <select name="" id="" onChange={useCase}>
                            <option value="Maintain">Maintain Case</option>
                            <option value="Ignore">Ignore Case</option>
                        </select>
                        <label htmlFor="">Foreign Chars:</label>
                        <select name="" id="" onChange={useForeign} >
                            <option value="Include">Include</option>
                            <option value="Ignore">Ignore</option>
                        </select>
                    </form>
                </div>
            </div>
            
        </div>
     );
}
 
export default Main;
