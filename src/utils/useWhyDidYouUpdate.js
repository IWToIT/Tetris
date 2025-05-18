import { useEffect, useRef } from "react";

export function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef(undefined);
  useEffect(() => {
    if (previousProps.current != null) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};
      allKeys.forEach((key) => {
        if (previousProps?.current?.[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current?.[key],
            to: props[key],
          };
        }
      });
      if (Object.keys(changesObj).length) {
        console.log("[update-reason]", name, changesObj);
      }
    }
    previousProps.current = props;
  });
}
