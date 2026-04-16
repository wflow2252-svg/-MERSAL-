import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="تواصل مباشر" 
        subtitle="Direct Sovereignty Support" 
        icon="contact_support" 
      />
      <div className="responsive-container py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
               <h2 className="text-4xl font-black text-primary tracking-tighter">نحن هنا لخدمتك</h2>
               <p className="text-primary/60 text-lg leading-relaxed">
                  فريق دعم مرسال متاح على مدار الساعة للإجابة على استفساراتكم وضمان تجربة تسوق لا تشوبها شائبة.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted rounded-[2rem] border-border/10 border">
                     <span className="material-symbols-rounded text-[#F29124] mb-4 text-3xl">mail</span>
                     <h4 className="text-sm font-black mb-2">البريد الإلكتروني</h4>
                     <p className="text-xs text-primary/40 font-bold">support@morsall.com</p>
                  </div>
                  <div className="p-8 bg-muted rounded-[2rem] border-border/10 border">
                     <span className="material-symbols-rounded text-accent mb-4 text-3xl">call</span>
                     <h4 className="text-sm font-black mb-2">رقم التواصل</h4>
                     <p className="text-xs text-primary/40 font-bold">+249 123 456 789</p>
                  </div>
               </div>
            </div>
            <div className="bg-muted p-12 rounded-[3rem] border-border/10 border shadow-2xl">
               <form className="space-y-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-4">الاسم الكامل</label>
                     <input type="text" className="input-field" placeholder="أدخل اسمك هنا" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-4">عنوان الرسالة</label>
                     <input type="text" className="input-field" placeholder="كيف يمكننا مساعدتك؟" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-4">تفاصيل الرسالة</label>
                     <textarea className="input-field min-h-[150px] resize-none" placeholder="اكتب استفسارك بالتفصيل..." />
                  </div>
                  <button type="button" className="btn-primary w-full shadow-elite-lg">إرسال الرسالة</button>
               </form>
            </div>
         </div>
      </div>
    </div>
  );
}
