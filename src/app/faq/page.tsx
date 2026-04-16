import PageHeader from "@/components/PageHeader";

export default function FAQPage() {
  const faqs = [
    {
      q: "كيف يمكنني تتبع طلبيتى؟",
      a: "يمكنك تتتبع حالة الطلب من خلال الذهاب إلى لوحة تحكم حسابك واختيار 'الطلبات'. ستتمكن من رؤية مسار الشحنة من وقت اعتمادها وحتى وصولها إلى باب منزلك."
    },
    {
      q: "ما هي سياسة الاسترجاع في مرسال؟",
      a: "نقدم ضمان سيادة مرسال للاسترجاع المجاني خلال 7 أيام من تاريخ الاستلام، بشرط أن يكون المنتج بحالته الأصلية ومرفقاً معه فاتورة الشراء الأصلية."
    },
    {
      q: "هل المنتجات المعروضة أصلية 100%؟",
      a: "مرسال هي منصة النخبة، وعليه فإننا نضمن أصالة كافة المنتجات المعروضة بموجب عقود حصرية وتدقيق صارم لكافة الموردين المعتمدين لدينا."
    },
    {
      q: "كيف يمكنني الانضمام كمورد على منصة مرسال؟",
      a: "نرحب بالشركاء المتميزين. يمكنك تقديم طلب الانضمام عبر صفحة 'كن بائعاً معنا' في أسفل الموقع. سيقوم فريقنا بمراجعة طلبك والتواصل معك في غضون 48 ساعة."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="مركز المساعدة" 
        subtitle="Sovereign Knowledge Base" 
        icon="help_center" 
      />
      <div className="responsive-container py-24 max-w-4xl">
         <div className="space-y-12">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-black text-primary tracking-tighter mb-4">الأسئلة الأكثر شيوعاً</h2>
               <p className="text-primary/50 text-sm font-bold">إجابات شاملة لاستفسارات النخبة في منصة مرسال</p>
            </div>
            
            <div className="space-y-6">
               {faqs.map((faq, index) => (
                 <div key={index} className="bg-muted p-8 rounded-[2rem] border border-border/10 hover:border-[#1089A4]/30 transition-all group">
                    <h3 className="text-lg font-black text-primary mb-4 flex items-center gap-4">
                       <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#F29124] shadow-sm font-inter">Q{index + 1}</span>
                       {faq.q}
                    </h3>
                    <p className="text-primary/60 leading-relaxed pr-14 border-r-2 border-[#1089A4]/20 mr-4">
                       {faq.a}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
