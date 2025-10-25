import {
  Users,
  Award,
  Shield,
  Video,
  CalendarClock,
  PhoneCall,
} from "lucide-react";
import Service from "./Service";
export default function Services() {
  return (
    <section className="container mx-auto not-sm:px-10 py-30">
      <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-30">
        <Service
          icon={<Users />}
          title={"العائلة"}
          description={
            "ادوات بسيطة  لكل من لمقدم الخدمة و الاطباء باللاضافة الى العائله"
          }
        />
        <Service
          icon={<Award />}
          title={"طرق علمية"}
          description={
            "طرق مجربه ومدعومه بالابحاث لتحسين النطق والحركه بالاضافة الى الادراك"
          }
        />
        <Service
          icon={<Shield />}
          title={"الامان & الخصوصيه"}
          description={"حيث انها بتوافق COPPA&HIPAA ويتم تخزين البيانات "}
        />
        <Service
          icon={<Video />}
          title={"جلسات عبر الانترنت"}
          description={
            "حيث انه يتم توفير التواصل عن بعد من خلال جلسات فيديو مع امكانيه الوصول لجميع الجلسات حيث تكون مسجلة"
          }
        />
        <Service
          icon={<CalendarClock />}
          title={"جدوله المواعيد"}
          description={"يوفر رفيق اختيار الوقت بحيث يتناسب مع الاطفال والاباء"}
        />
        <Service
          icon={<PhoneCall />}
          title={"تواصل بشكل امن "}
          description={
            "يوفر رفيق ان تكون البيانات سواء الطبيب او الاطفال ان تكون محميه وامنه"
          }
        />
      </section>
      <section className="flex justify-between not-lg:flex-col-reverse items-center gap-20 p-20 not-lg:p-0 not-lg:gap-15 relative">
        <div className="flex flex-col gap-5 text-center">
          <h3 className="text-3xl font-semibold text-green-800">الالعاب والجلسات</h3>
          <p className="text-2xl font-medium text-green-500">
            سوف يساعدك رفيق على كيفيه دعم طفلك بشكل افضل من خلال مجموعه ممن
            الجلسات وممارسه العاب مختلفه بطريق سهله وبسيطه
          </p>
        </div>
        <img src="Group 9419.png" alt="العاب" className="lg:w-1/2"/>
      </section>
    </section>
  );
}
