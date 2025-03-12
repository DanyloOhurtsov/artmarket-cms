import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorCompoent?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isData?: boolean;
}

const Container = ({
  children,
  isLoading = false,
  isError = false,
  isData = false,
}: ContainerProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return isData && <>{children}</>;
};

export default Container;
