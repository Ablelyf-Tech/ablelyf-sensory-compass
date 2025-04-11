
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PageTab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface PageTemplateProps {
  title: string;
  description?: string;
  tabs?: PageTab[];
  action?: React.ReactNode;
  children?: React.ReactNode;
  defaultTab?: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  tabs,
  action,
  children,
  defaultTab
}) => {
  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* If tabs are provided, render them */}
      {tabs ? (
        <Tabs defaultValue={defaultTab || tabs[0].id}>
          <TabsList className="w-full flex-wrap mb-6 bg-transparent p-0 justify-start">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="px-4 py-2 bg-white border rounded-md mr-2 mb-2 data-[state=active]:bg-ablelyf-blue-500 data-[state=active]:text-white"
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        children
      )}
    </AppLayout>
  );
};
