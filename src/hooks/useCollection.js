import { useState, useEffect } from "react";

import vetlogo from "../images/vetlogo.png";
import vetimage from "../images/vetimage.jpg";
import vetimage2 from "../images/vetimage2.jpg";

// Define some mock data for testing purposes
const mockData = {
  landingPage: {
    landingPageBackgroundImage: vetimage,
    landingPageHeadline: "Welcome to Vet Management System",
    landingPageSubhead:
      "The best solution for managing your pet health records",
    landingPageCTA: "Get Started",
    landingPageImage: vetlogo,
    landingPageImageAlt: "Vet Management System Logo",
  },
  registrationPage: {
    registrationPageBackgroundImage: vetimage2,
    registrationPageHeadline: "Create your account",
    registrationPageSubhead:
      "Join the Vet Management System and start managing your pet health records",
    registrationPageCTA: "Sign up",
    registrationPageImage: vetlogo,
    registrationPageImageAlt: "Vet Management System Logo",
  },
  loginPage: {
    loginPageBackgroundImage: vetimage,
    loginPageHeadline: "Welcome back",
    loginPageSubhead:
      "Sign in to your account and access your pet health records",
    loginPageCTA: "Log in",
  },
  dashboardPage: {
    dashboardPageTitle: "Vet Management System",
    dashboardPageBackgroundImage: "vetimage2",
    dashboardPageMenuItems: [
      {
        name: "Dashboard",
        icon: "DashboardIcon",
        path: "/dashboard",
      },
      {
        name: "Pets",
        icon: "PetsIcon",
        path: "/dashboard/pets",
      },
      {
        name: "Vaccines",
        icon: "LocalHospitalIcon",
        path: "/dashboard/vaccines",
      },
      {
        name: "Appointments",
        icon: "CalendarTodayIcon",
        path: "/dashboard/appointments",
      },
    ],
  },
  blog: {
    blogTitle: "How to Keep Your Pet Healthy and Happy",
    blogAuthor: "Dr. John Doe",
    blogDate: "2024-02-15",
    blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    blogImage: vetimage2,
    blogImageAlt: "A happy pet",
  },
  // Add more mock data for other collections as needed
};

// Define a custom hook that takes a collection name and an optional document id as parameters
const useCollection = (collectionName, docId) => {
  const [collectionItem, setCollectionItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define a function that mocks the fetching of the collection item from the database
  const mockFetchCollectionItem = () => {
    // Use a setTimeout to simulate an asynchronous operation
    setTimeout(() => {
      try {
        // Get the mock data for the collection or the document
        const data = docId
          ? mockData[collectionName][docId]
          : mockData[collectionName];

        // Check if the data exists
        if (data) {
          // Set the collection item state with the data
          setCollectionItem(data);
        } else {
          throw new Error("No such collection or document");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // Use the useEffect hook to call the mockFetchCollectionItem function when the component mounts or the parameters change
  useEffect(() => {
    mockFetchCollectionItem();
  }, [collectionName, docId]);

  // Return an object that contains the collection item and other properties
  return { collectionItem, loading, error };
};

export default useCollection;
