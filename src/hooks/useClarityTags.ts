import Clarity from "@microsoft/clarity";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useClarityTags = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const pageTags: Record<string, string> = {
      "/": "Home",
      "/about": "Nosotros",
      "/contact": "Contacto",
    };

    const tagName = pageTags[path];

    Clarity.event(`page_view_${tagName}`);
  }, [location.pathname]);
};
