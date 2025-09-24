"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/loadingSpinner";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <LoadingSpinner /> : children}</>;
};

export default PageLayout;
