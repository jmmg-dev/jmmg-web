"use server";

import { Information } from "@/models/interfaces";
import { InformationDict } from "@/models/types";
import { CareerDescription } from "./CareerDescription";
import { Degrees } from "./degrees/Degrees";
import { Hero } from "./Hero";
import { Hobbies } from "./Hobbies/Hobbies";
import { Milestones } from "./milestones/Milestones";

const InformationSection = async ({
  dict,
  information,
}: {
  dict: InformationDict;
  information: Information;
}) => {
  return (
    <section id="information" className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero dict={dict} personalInfo={information.personalInfo} />
        <CareerDescription
          dict={dict}
          professionalInfo={information.professionalInfo}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Degrees dict={dict} degrees={information.professionalInfo.degrees} />
          <Milestones
            dict={dict}
            milestones={information.professionalInfo.milestones}
          />
        </div>
        <Hobbies dict={dict} hobbies={information.personalInfo.hobbies} />
      </div>
    </section>
  );
};

export default InformationSection;
