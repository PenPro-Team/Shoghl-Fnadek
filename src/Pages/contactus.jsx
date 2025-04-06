import React, { Component } from "react";
import contactus_axiosInstance from "../axiosinstances/contactus";
import ceramicImage from "../images/1.jpg";
import contactHeroImage from "../images/contact-01.jpg"; // Add this import

const secondaryColor = "#025048"; // اللون الأخضر المميز

class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
      touched: {},
      errors: {},
      isSubmitting: false,
      submitSuccess: false,
      faqItems: [
        {
          question: "كيف أقوم بإنشاء حساب؟",
          answer:
            "يمكنك إنشاء حساب بالضغط على زر 'تسجيل' في الرأس واتباع التعليمات.",
          isOpen: false,
        },
        {
          question: "كيف أقوم بإعادة تعيين كلمة المرور الخاصة بي؟",
          answer:
            "لإعادة تعيين كلمة المرور، انقر على رابط 'نسيت كلمة المرور' في صفحة تسجيل الدخول واتبع التعليمات المرسلة إلى بريدك الإلكتروني.",
          isOpen: false,
        },
        {
          question: "كيف يمكنني الاتصال بالدعم الفني؟",
          answer:
            "يمكنك الاتصال بالدعم الفني عبر نموذج الاتصال في هذه الصفحة، أو عن طريق مراسلتنا مباشرة على info@shoghlfnadek.com.",
          isOpen: false,
        },
        {
          question: "ما هي أنواع الوظائف المدرجة في شغل فنادق؟",
          answer:
            "يسرد شغل فنادق مجموعة واسعة من الوظائف، مع التركيز بشكل أساسي على قطاعي الضيافة والسياحة. وهذا يشمل وظائف في الفنادق والمنتجعات والمطاعم والصناعات ذات الصلة.",
          isOpen: false,
        },
        {
          question: "هل التقديم على الوظائف في شغل فنادق مجاني؟",
          answer:
            "نعم، التقديم على الوظائف المدرجة في شغل فنادق مجاني تمامًا للباحثين عن عمل. خدماتنا مصممة لربطك بأصحاب العمل المحتملين دون أي تكلفة.",
          isOpen: false,
        },
      ],
    };
  }

  validateForm = () => {
    const { name, email, phone, message } = this.state.formData;
    const errors = {};

    // التحقق من الاسم
    if (!name.trim()) {
      errors.name = "الاسم مطلوب";
    } else if (name.length < 3) {
      errors.name = "يجب أن يتكون الاسم من 3 أحرف على الأقل";
    }

    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(email)) {
      errors.email = "صيغة بريد إلكتروني غير صالحة";
    }

    // التحقق من الهاتف (أرقام مصرية)
    const phoneRegex = /^(\+20|0)?1[0125]\d{8}$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.phone = "رقم هاتف مصري غير صالح";
    }

    // التحقق من الرسالة
    if (!message.trim()) {
      errors.message = "الرسالة مطلوبة";
    } else if (message.length < 10) {
      errors.message = "يجب أن تتكون الرسالة من 10 أحرف على الأقل";
    }

    return errors;
  };

  handleBlur = (field) => {
    this.setState((prevState) => ({
      touched: { ...prevState.touched, [field]: true },
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "", // مسح الخطأ عند التغيير
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    // إضافة لمس جميع الحقول لإظهار الأخطاء عند الإرسال إذا لم يتم لمسها
    const allTouched = Object.keys(this.state.formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});

    if (Object.keys(errors).length === 0) {
      this.setState({ isSubmitting: true, touched: allTouched });

      try {
        console.log("إرسال بيانات النموذج:", this.state.formData);

        const response = await contactus_axiosInstance.post("/contactus/", {
          name: this.state.formData.name,
          email: this.state.formData.email,
          phone: this.state.formData.phone || null, // إرسال null إذا كان الهاتف فارغًا
          subject: this.state.formData.subject || "", // إرسال "" إذا كان الموضوع فارغًا
          message: this.state.formData.message,
        });

        console.log("الاستجابة:", response);

        if (response.status === 201 || response.status === 200) {
          this.setState({
            isSubmitting: false,
            submitSuccess: true,
            formData: {
              // إعادة تعيين النموذج
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            },
            touched: {}, // إعادة تعيين الحقول الملموسة
          });
        }
      } catch (error) {
        console.error("تفاصيل الخطأ:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        this.setState({
          isSubmitting: false,
          errors: {
            ...errors, // الاحتفاظ بأخطاء التحقق الأولية
            submit:
              error.response?.data?.detail ||
              error.response?.data?.message ||
              "حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقاً.",
          },
          touched: allTouched, // تأكد من أن الحقول تعتبر ملموسة لإظهار الأخطاء
        });
      }
    } else {
      // إذا كانت هناك أخطاء، قم بتحديث الحالة لإظهارها وتعيين touched
      this.setState({ errors, touched: allTouched });
    }
  };

  toggleFAQ = (index) => {
    this.setState((prevState) => {
      const updatedFaqItems = prevState.faqItems.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: !item.isOpen };
        } else {
          // ضمان إغلاق الأسئلة الأخرى عند فتح واحد جديد
          return { ...item, isOpen: false };
        }
      });
      return { faqItems: updatedFaqItems };
    });
  };

  render() {
    const { formData, errors, isSubmitting, submitSuccess, touched, faqItems } =
      this.state;

    return (
      // إضافة dir="rtl" لتطبيق الاتجاه من اليمين لليسار
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {/* قسم الهيرو */}
        <div
          className="pt-16 pb-16 relative" // تقليل ال padding-bottom
          style={{ backgroundColor: secondaryColor, color: "white" }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* تم عكس ترتيب العناصر النصية والصورة في الشاشات الكبيرة بسبب dir="rtl" */}
              <div className="w-full md:w-1/2 flex justify-start">
                <div className="relative w-full max-w-[460px] transform translate-y-24">
                  {" "}
                  {/* زيادة قيمة translate-y */}
                  <img
                    src={contactHeroImage}
                    alt="صورة قسم الاتصال"
                    className="w-full h-auto rounded-lg shadow-2xl" // تحسين الظل
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-right">
                {" "}
                {/* محاذاة النص */}
                <h1 className="text-5xl font-bold mb-4">اتصل بنا</h1>
                <p className="text-xl opacity-90">
                  نحن هنا لمساعدتك في رحلتك المهنية
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* قسم نموذج الاتصال */}
        <div className="container mx-auto px-6 pt-32 pb-16">
          {" "}
          {/* زيادة ال padding-top */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* معلومات الاتصال */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  معلومات الاتصال
                </h2>
                <div className="space-y-6">
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
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
                      <h3 className="text-lg font-semibold text-gray-800">
                        الهاتف
                      </h3>
                      <p className="text-gray-600 hover:text-blue-600 transition-colors">
                        {/* تأكد من أن الرابط يعمل بشكل صحيح في RTL */}
                        <a
                          href="tel:+201023335554"
                          dir="ltr"
                          className="inline-block"
                        >
                          +20 102 333 5554
                        </a>
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        البريد الإلكتروني
                      </h3>
                      <p className="text-gray-600 hover:text-blue-600 transition-colors">
                        <a
                          href="mailto:info@shoghlfnadek.com"
                          dir="ltr"
                          className="inline-block"
                        >
                          info@shoghlfnadek.com
                        </a>
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
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
                      <h3 className="text-lg font-semibold text-gray-800">
                        العنوان
                      </h3>
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
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
                      <h3 className="text-lg font-semibold text-gray-800">
                        ساعات العمل
                      </h3>
                      <p className="text-gray-600">
                        الأحد - الخميس: 10:00 صباحًا - 6:00 مساءً
                      </p>
                      <p className="text-gray-600">الجمعة - السبت: مغلق</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      تابعنا
                    </h3>
                    {/* تم عكس space-x إلى space-x-reverse ضمنيًا بـ dir="rtl" */}
                    <div className="flex space-x-4">
                      <a
                        href="https://www.facebook.com/profile.php?id=100063959018807"
                        className="p-3 rounded-full hover:bg-blue-200 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: secondaryColor }}
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </a>
                      {/* يمكنك إضافة أيقونات وسائل تواصل اجتماعي أخرى هنا */}
                    </div>
                  </div>
                </div>
              </div>

              {/* نموذج الاتصال */}
              <div>
                {submitSuccess ? (
                  <div
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: "rgba(2, 80, 72, 0.05)" }}
                  >
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: secondaryColor }}
                    >
                      شكراً لتواصلك معنا!
                    </h3>
                    <p className="text-green-700">
                      سنعود إليك في أقرب وقت ممكن.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={this.handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2 text-right">
                        الاسم بالكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("name")}
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          touched.name && errors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="أدخل اسمك بالكامل"
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-xs mt-1 text-right">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2 text-right">
                        عنوان البريد الإلكتروني{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        // تغيير النوع إلى email للاستفادة من التحقق المدمج في المتصفح (اختياري)
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("email")}
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          touched.email && errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="أدخل عنوان بريدك الإلكتروني"
                        dir="ltr" // مهم لحقول الإدخال التي تتوقع LTR مثل الإيميل
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mt-1 text-right">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2 text-right">
                        رقم الهاتف
                      </label>
                      <input
                        type="text" // يبقى نصاً للتعامل مع + و 0 البادئة
                        name="phone"
                        value={formData.phone}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("phone")}
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          touched.phone && errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="أدخل رقم هاتفك (مثال: 010xxxxxxxx)"
                        dir="ltr" // مهم لحقول الإدخال التي تتوقع LTR مثل رقم الهاتف
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs mt-1 text-right">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2 text-right">
                        الموضوع
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={this.handleChange}
                        // لا حاجة لـ onBlur هنا إذا لم يكن هناك تحقق محدد
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all border-gray-300"
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="أدخل موضوع الرسالة"
                      />
                      {/* لا يوجد خطأ محدد للموضوع في الكود الأصلي */}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2 text-right">
                        الرسالة <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("message")}
                        rows="4"
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          touched.message && errors.message
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="أدخل رسالتك هنا"
                      ></textarea>
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-xs mt-1 text-right">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="mb-4 text-right">
                        <p className="text-red-500 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      style={{ backgroundColor: secondaryColor }}
                    >
                      {isSubmitting ? "جار الإرسال..." : "أرسل الرسالة"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* قسم الأسئلة الشائعة */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-right">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <button
                    className="flex items-center justify-between w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none transition-all duration-500 text-right"
                    onClick={() => this.toggleFAQ(index)}
                  >
                    {/* SVG يتم وضعه على اليسار تلقائيًا بسبب flex و justify-between في RTL */}
                    <svg
                      className={`w-5 h-5 text-gray-600 transform transition-transform duration-500 ease-in-out ${
                        item.isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {/* النص يمينًا */}
                    <span>{item.question}</span>
                  </button>
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden bg-white`}
                    style={{
                      maxHeight: item.isOpen ? "1000px" : "0",
                      opacity: item.isOpen ? 1 : 0,
                      transform: `translateY(${item.isOpen ? "0" : "-10px"})`,
                      transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="p-6 text-gray-700 text-right">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* قسم الحث على اتخاذ إجراء */}
        <div className="w-full" style={{ backgroundColor: secondaryColor }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* الجانب الأيسر - المحتوى (سيظهر يمينًا في RTL) */}
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
            {/* الجانب الأيمن - الصورة (ستظهر يسارًا في RTL) */}
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
      </div>
    );
  }
}

export default Contactus;
