import React from "react";
import classes from "./TypedText.module.css";
import { useState } from "react";
import useAnimationFrame, {
  useAnimationFrameCallback,
} from "../../hooks/useAnimationFrame";

export interface TypedTextProps {
  text: string;
  interval: number;
  delay: number;
  className?: string;
}

const TypedText = (props: TypedTextProps) => {
  const [typedText, setTypedText] = useState("");

  const type: useAnimationFrameCallback = (time) => {
    let interval = props.interval;
    if (time >= props.delay && props.text !== (null || undefined)) {
      setTypedText((prevTypedText) => {
        const newLength = prevTypedText.length + 1;
        const newValue = props.text.substr(0, newLength);
        if (newLength === props.text.length) {
          interval = 0;
        }
        return newValue;
      });
    }
    return interval;
  };
  const cursorClasses = [classes.Pulse, classes.TextCursor].join(" ");

  useAnimationFrame(type);

  return (
    <div className={props.className}>
      <p>
        <span dangerouslySetInnerHTML={{ __html: typedText }}></span>
        <span className={cursorClasses}>▮</span>
      </p>
    </div>
  );
};

export default TypedText;
