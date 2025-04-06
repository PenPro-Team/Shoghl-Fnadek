import React, { Component } from "react";
import aboutHeroImage from "../images/about-03.jpg";
import ourStoryImage from "../images/our-story.jpg";
import ourJourneyImage from "../images/our-journey.jpg";
import ceramicImage from "../images/1.jpg";

const secondaryColor = "#025048"; // اللون الأخضر المميز

class About extends Component {
  render() {
    return (
      // إضافة dir="rtl" لتطبيق الاتجاه من اليمين لليسار
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {/* قسم الهيرو */}
        <div
          className="pt-16 pb-16 relative"
          style={{ backgroundColor: secondaryColor, color: "white" }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* تم عكس ترتيب العناصر النصية والصورة في الشاشات الكبيرة بسبب dir="rtl" */}
              <div className="w-full md:w-1/2 flex justify-start">
                {" "}
                {/* تغيير justify-end إلى justify-start */}
                <div className="relative w-full max-w-[460px] transform translate-y-24">
                  <img
                    src={aboutHeroImage}
                    alt="صورة قسم عن الشركة"
                    className="w-full h-auto rounded-lg shadow-2xl"
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-right">
                {" "}
                {/* محاذاة النص */}
                <h1 className="text-5xl font-bold mb-4">عن الشركة</h1>
                <p className="text-xl opacity-90">
                  نربط المواهب بالفرص في قطاع الفنادق
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div>
          {/* القسم الأول - رمادي */}
          <section
            className="w-full py-16"
            style={{ backgroundColor: "#f1f4f1" }}
          >
            <div className="container mx-auto px-6">
              {/* محتوى نصي */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-right">
                {/* العمود الأيمن - العناوين */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    قصتنا
                  </h2>
                  <h3 className="text-2xl md:text-3xl text-gray-700">
                    استكشف سيراميك شوب وفن صناعة السيراميك لدينا
                  </h3>
                </div>

                {/* العمود الأيسر - الوصف */}
                <div className="flex items-center">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    ادخل إلى عالم سيراميك شوب، حيث نكرس جهودنا لصناعة سيراميك
                    أنيق وعملي يرتقي بحياتك اليومية. رحلتنا هي شهادة على الفن
                    والحرفية التي تتخلل كل قطعة فريدة. اكتشف قصتنا، قابل
                    الحرفيين الموهوبين الذين يبدعون هذه الإبداعات، وجرب الجمال
                    الاستثنائي الذي يضيفه السيراميك الخاص بنا إلى محيطك. استكشف
                    قلب وروح متجرنا، حيث كل قطعة هي عمل فني، مصممة لجعل لحظاتك
                    أكثر جمالاً وتميزًا.
                  </p>
                </div>
              </div>

              {/* صورة بعرض كامل */}
              <div className="w-full h-[600px] overflow-hidden rounded-lg">
                <img
                  src={ourStoryImage}
                  className="w-full h-full object-cover" // object-cover للحفاظ على نسبة العرض إلى الارتفاع
                  alt="قصتنا"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* القسم الثاني - أبيض */}
          <section
            className="w-full py-16" // تعديل padding
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="container mx-auto px-6">
              {" "}
              {/* تعديل padding */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {" "}
                {/* زيادة الفجوة */}
                {/* العمود الأيمن - المحتوى */}
                <div className="flex flex-col md:col-span-7 order-1 md:order-1 text-right">
                  <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                      رحلتنا
                    </h2>
                    <h3 className="text-2xl md:text-3xl text-gray-700 mb-8">
                      رحلتنا في عالم السيراميك: صياغة الجمال والجودة.
                    </h3>
                    <div className="space-y-6">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        قصة شركتنا هي شهادة على الحب الدائم للحرفية، حيث نجمع
                        بين شغفنا بالسيراميك والتزامنا الراسخ بالجودة والجمال
                        الخالد. استكشف الرحلة التي قادتنا لنصبح مصدرًا موثوقًا
                        لمنتجات السيراميك الرائعة.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        نحن فخورون بمشاركة قصتنا، التي تعكس نمو حلم إلى وجهة
                        مزدهرة للإبداعات الاستثنائية، مما يعكس الفن والابتكار.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        إن تفانينا في صناعة قطع سيراميك أنيقة وعملية تعزز الحياة
                        اليومية هو جوهر سردنا، وهي قصة نحن متحمسون لمشاركتها
                        معك.
                      </p>
                    </div>
                  </div>
                  <div className="mb-8">
                    {" "}
                    {/* فصل المهمة والرؤية */}
                    <h3 className="text-2xl md:text-3xl text-gray-700 mb-4">
                      مهمتنا
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      مهمتنا هي إنشاء قطع سيراميك استثنائية تمزج بين الفن
                      والوظيفة، وإثراء الحياة من خلال الجمال والحرفية.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-gray-700 mb-4">
                      رؤيتنا
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      رؤيتنا هي أن نكون روادًا عالميًا في فن السيراميك، نلهم
                      الإبداع والتقدير لجمال السيراميك المصنوع يدويًا في كل
                      منزل.
                    </p>
                  </div>
                </div>
                {/* العمود الأيسر - الصورة */}
                <div className="relative h-[600px] md:h-auto md:col-span-5 overflow-hidden order-2 md:order-2 self-center">
                  {" "}
                  {/* تعديل الارتفاع ومحاذاة الصورة */}
                  <img
                    src={ourJourneyImage}
                    className="w-full h-full object-cover object-center rounded-lg"
                    alt="رحلتنا"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* قسم الحث على اتخاذ إجراء */}
          <div className="w-full" style={{ backgroundColor: secondaryColor }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* الجانب الأيمن - المحتوى (سيظهر يمينًا في RTL) */}
              <div className="flex flex-col items-center justify-center py-8 md:py-12 px-6 md:px-12 order-1 md:order-1">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 text-center leading-tight">
                  اكتشف عالم فن السيراميك، ابدأ رحلتك هنا!
                </h2>
                <a
                  href="#" // يمكنك تغيير الرابط لاحقًا
                  className="bg-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
                  style={{
                    color: secondaryColor,
                    borderColor: "white",
                    border: "2px solid white",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "2px solid white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = secondaryColor;
                    e.currentTarget.style.border = "2px solid white";
                  }}
                >
                  تسوق الآن
                </a>
              </div>
              {/* الجانب الأيسر - الصورة (سيظهر يسارًا في RTL) */}
              <div className="relative h-[350px] md:h-[400px] overflow-hidden order-2 md:order-2">
                <img
                  src={ceramicImage}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  alt="فن السيراميك"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* القسم الثالث - رمادي (العنوان والخريطة) */}
          <section
            className="w-full py-16" // زيادة padding
            style={{ backgroundColor: "#f1f4f1" }}
          >
            <div className="container mx-auto px-6">
              {" "}
              {/* إضافة container و padding */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* معلومات العنوان */}
                <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-300 text-right">
                  <div className="space-y-8">
                    {/* تم عكس space-x إلى space-x-reverse ضمنيًا بـ dir="rtl" */}
                    <div className="flex items-start space-x-4">
                      <div
                        className="flex-shrink-0"
                        style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                      >
                        <div className="rounded-full p-3">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: secondaryColor }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">العنوان</h3>
                        <p className="text-gray-600">
                          نادي المعلمين، أمام مكتبة هشام وعمرو،
                          <br />
                          بني سويف، مصر
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div
                        className="flex-shrink-0"
                        style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                      >
                        <div className="rounded-full p-3">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: secondaryColor }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          ساعات العمل
                        </h3>
                        <p className="text-gray-600">
                          الأحد - الخميس: 10:00 صباحًا - 6:00 مساءً
                        </p>
                        <p className="text-gray-600">الجمعة - السبت: مغلق</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div
                        className="flex-shrink-0"
                        style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                      >
                        <div className="rounded-full p-3">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: secondaryColor }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">الاتصال</h3>
                        {/* استخدام dir="ltr" للأرقام والبريد الإلكتروني */}
                        <p className="text-gray-600" dir="ltr">
                          الهاتف:{" "}
                          <a
                            href="tel:+201023335554"
                            className="hover:text-blue-600"
                          >
                            +20 102 333 5554
                          </a>
                        </p>
                        <p className="text-gray-600" dir="ltr">
                          البريد الإلكتروني:{" "}
                          <a
                            href="mailto:info@shoghlfnadek.com"
                            className="hover:text-blue-600"
                          >
                            info@shoghlfnadek.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* الخريطة */}
                <div className="bg-white p-4 rounded-xl shadow-lg h-[500px] transform transition-transform hover:scale-105 duration-300">
                  <div
                    className="w-full h-full rounded-lg overflow-hidden border-4 border-opacity-20"
                    style={{ borderColor: secondaryColor }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.3461861746714!2d31.098371!3d29.069478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a27d96947b6f5%3A0x2f6ab1c78c5e369c!2sTeachers%20Club%20Beni%20Suef!5e0!3m2!1sar!2seg!4v1711531248744!5m2!1sar!2seg" // تم تغيير اللغة إلى ar في الرابط
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="موقع نادي المعلمين بني سويف" // إضافة عنوان للخريطة
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default About;
