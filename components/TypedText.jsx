import { useEffect, useState } from "react";
import TypeWriter from "react-native-typewriter";

export default function TypedMultipleTexts({
  texts,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIndex((prev) => (prev + 1) % texts.length);
      },
      texts[index].length * 60 + 800
    );

    return () => clearTimeout(timer);
  }, [index]);

  return <TypeWriter typing={1}>
    {texts[index]}
  </TypeWriter>;
}
