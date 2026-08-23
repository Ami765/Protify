import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EditorView } from './components/EditorView';
import { LivePortfolioView } from './components/LivePortfolioView';
import { AiAgentView } from './components/AiAgentView';
import { TemplatesView } from './components/TemplatesView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { initialPortfolioData } from './data/mockData';
import { PortfolioTemplateItem } from './data/templates';
import { NavTab, PortfolioData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('editor');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  const handleApplyTemplate = (template: PortfolioTemplateItem) => {
    setPortfolioData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...(template.data.profile || {}),
      },
      theme: {
        ...prev.theme,
        ...(template.data.theme || {}),
      },
    }));
  };

  const handleTriggerAiPrompt = (promptText: string) => {
    setAiInitialPrompt(promptText);
    setActiveTab('ai-agent');
  };

  return (
    <div className="w-full min-h-screen h-screen bg-[#F8FAFC] flex overflow-hidden font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        portfolioData={portfolioData}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Global Header */}
        <Header
          portfolioData={portfolioData}
          onPreviewClick={() => setActiveTab('preview')}
          onAiClick={() => setActiveTab('ai-agent')}
        />

        {/* Scrollable Main Stage */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'editor' && (
              <EditorView
                data={portfolioData}
                onChange={setPortfolioData}
                onOpenAiPrompt={handleTriggerAiPrompt}
                onPreviewLive={() => setActiveTab('preview')}
              />
            )}

            {activeTab === 'preview' && (
              <LivePortfolioView
                data={portfolioData}
                onEditSection={() => setActiveTab('editor')}
              />
            )}

            {activeTab === 'ai-agent' && (
              <AiAgentView
                portfolioData={portfolioData}
                onUpdatePortfolio={setPortfolioData}
                initialPrompt={aiInitialPrompt}
              />
            )}

            {activeTab === 'templates' && (
              <TemplatesView
                onApplyTemplate={handleApplyTemplate}
                currentThemeId={portfolioData.theme.id}
                onPreviewLive={() => setActiveTab('preview')}
              />
            )}

            {activeTab === 'analytics' && <AnalyticsView />}

            {activeTab === 'settings' && (
              <SettingsView
                data={portfolioData}
                onChange={setPortfolioData}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
