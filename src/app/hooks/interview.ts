import { useMutation } from "@tanstack/react-query";

import { StudyUserMetaData } from "@/core/study";

export interface NewInterview {
  studyId?: string;
  userMetaData?: { [key: string]: any };
}

const useCreateInterview = () => {
  const mutation = useMutation({
    mutationFn: (newInterview: NewInterview) => {
      return fetch("/api/interviews/start", {
        method: "POST",
        body: JSON.stringify(newInterview),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          let data: {
            success?: boolean;
            id?: string;
            token?: string;
          } = {};

          if (!res.ok) {
            data = {
              success: false,
            };
          } else {
            data = await res.json();
          }
          return data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  });

  return {
    ...mutation,
  };
};

export default useCreateInterview;
