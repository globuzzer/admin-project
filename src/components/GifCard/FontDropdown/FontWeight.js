import React, { Fragment,useState }  from 'react';
import weighty from "./font.module.css";

const weights = ["Bold", "Bolder", "Normal", "Light"]

const FontWeight = () => {
    const [fontWeight, setfontWeight] = useState("Bold");
    
    const changeWeight = (e) => {
    setfontWeight(e.target.value)
}

    return (
        <Fragment>
            <select value={fontWeight} onChange={changeWeight} className={weighty.fontbox}>
                {weights.map((weight) => {
                    return (
                      <option value={weight} key={weight}>
                        {weight}
                      </option>
                    );
                   
                })}
            </select>
        </Fragment>
    );
}

export default FontWeight;
