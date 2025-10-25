import Feature from "./Feature";

export default function Features() {
  return (
    <section className="container mx-auto px-10 pb-30">
      <div className="text-center mb-10 flex flex-col gap-5">
        <h2 className="text-5xl font-semibold text-[#2C3E50] not-sm:text-4xl">
          لماذا نختار <span className="text-green-600">رفيق</span>؟
        </h2>
        <p className="text-2xl font-medium text-[#717182] not-sm:text-xl">
        كل ما تحتاجه لدعم طفلك فى مكان واحد
      </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <Feature
          icon="🎯"
          title="تقييمات متخصصة"
          description="تقييمات فردية  لكل مجال من النطق والحركه والادراك لمتابعه تطور كل طفل"
        />
        <Feature
          icon="🎮"
          title="العاب تفاعلية"
          description=" العاب ممتعه تهدف لتطوير الاطفال بطريقه تحفيزيه"
        />
        <Feature
          icon="📊"
          title="متابعه التقدم"
          description=" تتبع انجازات طفلك وتطوير مهاراته خطوه بخطوة عبر تقارير سهله وواضحه"
        />
        <Feature
          icon="🎥"
          title="مكالمات فيديو"
          description=" حيث توجد جلسات عبر الانترنت يتمكن بها الاخصائيين التواصل"
        />
        <Feature
          icon="👨‍👩‍👧‍👦"
          title="دعم للمستخدميين"
          description="حيث ان يمكن لكل من اولياء الامور و الاخصايين متابعه الطفل والتفاعل فى الجلسات"
        />
        <Feature
          icon="♿"
          title="تصميم واضح"
          description="تصيميم موافق معايير المستخدم  بحيث يوافق الجميع و ذو الاحتياجات الخاصه"
        />
      </div>
    </section>
  );
}
