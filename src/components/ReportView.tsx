"use client"

import { FileText, Printer, Download, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportViewProps {
  title: string;
  subtitle: string;
  data: any[];
  columns: { key: string; label: string }[];
}

export default function ReportView({ title, subtitle, data, columns }: ReportViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden print:p-0 print:border-0 print:shadow-none">
      {/* Report Header */}
      <div className="px-10 py-12 border-b-4 border-primary flex items-center justify-between flex-wrap gap-6 bg-muted/20">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-primary/20">
            <FileText className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">{title}</h2>
            <p className="text-foreground/50 font-medium flex items-center gap-2 mt-1">
               <Calendar className="w-4 h-4" /> التاريخ: {new Date().toLocaleDateString("ar-EG")} | {subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-border px-6 py-3 rounded-xl font-bold hover:bg-muted transition-all"
          >
            <Printer className="w-4 h-4" /> طباعة
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Download className="w-4 h-4" /> تصدير PDF
          </button>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-6 bg-muted/30 rounded-2xl border border-border">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">إجمالي العمليات</span>
            <div className="text-2xl font-black mt-1">124 عملية</div>
         </div>
         <div className="p-6 bg-muted/30 rounded-2xl border border-border">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">المبلغ الإجمالي</span>
            <div className="text-2xl font-black mt-1 text-primary">1,240,000 ج.س</div>
         </div>
         <div className="p-6 bg-muted/30 rounded-2xl border border-border">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">صافي العمولة</span>
            <div className="text-2xl font-black mt-1 text-secondary">186,000 ج.س</div>
         </div>
      </div>

      {/* Report Data Table */}
      <div className="px-10 pb-12 overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b-2 border-border/10">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border/50 font-medium text-sm hover:bg-muted/10 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-5">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Footer */}
      <div className="px-10 py-6 bg-muted/10 text-center border-t border-border">
        <p className="text-[10px] font-bold text-foreground/30">
          تم إنشاء هذا التقرير آلياً بواسطة نظام مرسال &quot;Mersal Dashboard&quot; - جميع الحقوق محفوظة {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
