import { use, useEffect, useState } from "react"


const Form = ({encode, encKey, encAlp, invalidKey, maintainCase, useForeignChar}) => {
    const [message, setmessage] = useState("")
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [copied, setCopied] = useState(false);
    const isAlpha = (char) => {return /^[a-zA-Z]$/.test(char)}
    useEffect(() => {
        let encryption_key_array=[]
        let encryption_message_array=[]
        let specialChar=[]
        let uppercaseLettersIndex=[]
        let specialCharIndices=[]
        let lowerEncryptedMessage=[]
        if (message.length===0){
            setEncryptedMessage("")
            return
        }
        for (let i=0; i<message.length; i++){
                if (encAlp.includes(message[i])){
                    encryption_message_array.push(encAlp.indexOf(message[i]))
                }
                else{
                    if (isAlpha(message[i])){
                        uppercaseLettersIndex.push(i)
                        encryption_message_array.push(encAlp.indexOf(message[i].toLowerCase()))
                    }
                    else{
                        specialChar.push(message[i])
                        specialCharIndices.push(i)
                    }
                }
        }

        if (invalidKey){
            setEncryptedMessage("")
            return
        }
        else{
            for(let i=0; i<encKey.length; i++){
                if (encAlp.includes(encKey[i])){
                    encryption_key_array.push(encAlp.indexOf(encKey[i]))
                }
            }
        }

        for (let i = 0; i < encryption_message_array.length; i++) {
            const encryption_index = encryption_message_array[i];
            const keyIndex = i % encryption_key_array.length;
            let letter;
            let message_index;

            if (encode) {
                message_index = (encryption_index + encryption_key_array[keyIndex]) % encAlp.length;
                letter = encAlp[message_index];
            } else {
                message_index = (encryption_index - encryption_key_array[keyIndex]) % encAlp.length;
                if (message_index < 0) {
                    message_index += encAlp.length; 
                }
                letter = encAlp[message_index];
            }

            lowerEncryptedMessage.push(letter); 
        }

        for (let i = 0; i < specialCharIndices.length; i++) {
            const index = specialCharIndices[i];
            const char = specialChar[i];
            lowerEncryptedMessage.splice(index, 0, char);
        }

        let finalWord = [];
        if (uppercaseLettersIndex.length > 0) {
            for (let j = 0; j < lowerEncryptedMessage.length; j++) {
                if (uppercaseLettersIndex.includes(j)) {
                    finalWord.push(lowerEncryptedMessage[j].toUpperCase());
                } else {
                    finalWord.push(lowerEncryptedMessage[j]);
                }
            }
        }else{
            finalWord=lowerEncryptedMessage
        }

        let finalMessage= []
        if (!useForeignChar) {
            for (let i = 0; i < finalWord.length; i++) {
                if (encAlp.includes(finalWord[i].toLowerCase())) {
                    finalMessage.push(finalWord[i]);
                }
            }
        }else{
            finalMessage=finalWord
        }
        
        setEncryptedMessage(finalMessage.join(""));

        if (!maintainCase) {
            setEncryptedMessage(finalMessage.join("").toLowerCase());
        }
    },[message,encKey, encAlp, encode, invalidKey, maintainCase, useForeignChar]);

    useEffect(() => {
        setEncryptedMessage("");
        setmessage("");
    },[encode])
    let firstText = encode ? "Plain Text:" : "Cyphered Text:";
    let secondText = encode ? "Cyphered Text:" : "Plain Text:";

    const handleCopy = () =>{
        navigator.clipboard.writeText(encryptedMessage);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);

    }
    return ( 
        <form>
                <div className="plain-text">
                    <label>{firstText}</label>
                    <input type="text"  placeholder="Enter your text here" onChange={(e) => setmessage(e.target.value)} value={message} />
                </div>
                <div className="cypher-text">
                <div className="copy-label">
                    <label>{secondText}</label>
                    { copied && <div className="copy-text">Copied <i class="fa-solid fa-check"></i></div>}
                </div>
                <div className="copy-input">
                    <input type="text" readOnly id="cypher-text" value={encryptedMessage} />
                    { encryptedMessage && <i onClick={handleCopy} class="fa-regular fa-2x fa-copy copy"></i>}
                </div>
                
                </div>
        </form>
     );
}
 
export default Form;
