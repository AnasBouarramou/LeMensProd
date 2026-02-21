import { useRef, useState, useEffect } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// NOUVEAU : On ajoute la prop rootRef
const AnimatedNumber = ({ value, prefix = "", suffix = "", rootRef }) => {
  const ref = useRef(null);

  // NOUVEAU : On passe le root à useInView. S'il est undefined (Landing Page), il utilisera window par défaut !
  const isInView = useInView(ref, {
    once: true,
    margin: "-20%",
    root: rootRef,
  });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
