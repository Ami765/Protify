import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAgentView } from '../components/AiAgentView';
import { EditorView } from '../components/EditorView';
import { initialPortfolioData } from '../data/mockData';

describe('AI Copilot & Chat Message Renderer', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('renders initial welcome prompt and assistant greetings', () => {
    render(
      <AiAgentView
        portfolioData={initialPortfolioData}
        onUpdatePortfolio={vi.fn()}
      />
    );

    expect(
      screen.getByText(/I am your Portify AI Portfolio Copilot/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Ask AI to polish your bio/i)
    ).toBeInTheDocument();
  });

  it('shows loading indicator and pending state when user submits a message', async () => {
    const user = userEvent.setup();
    render(
      <AiAgentView
        portfolioData={initialPortfolioData}
        onUpdatePortfolio={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/Ask AI to polish your bio/i);
    await user.type(input, 'Analyze my skills{Enter}');

    // Verify loading state is shown
    expect(
      await screen.findByText(/Synthesizing portfolio intelligence/i)
    ).toBeInTheDocument();
  });

  it('renders tool-result action and applies generated bio to portfolio', async () => {
    const user = userEvent.setup();
    const handleUpdate = vi.fn();

    render(
      <AiAgentView
        portfolioData={initialPortfolioData}
        onUpdatePortfolio={handleUpdate}
      />
    );

    // Click quick prompt to generate bio
    const bioQuickPrompt = screen.getByRole('button', { name: /Write High-Impact Bio/i });
    await user.click(bioQuickPrompt);

    // Wait for AI tool action button to render
    const applyButton = await screen.findByRole('button', {
      name: /Apply this Bio to Portfolio/i,
    });
    expect(applyButton).toBeInTheDocument();

    // Click tool action
    await user.click(applyButton);

    expect(handleUpdate).toHaveBeenCalled();
  });

  it('renders ATS audit result scorecard and category scores', async () => {
    const user = userEvent.setup();
    render(
      <AiAgentView
        portfolioData={initialPortfolioData}
        onUpdatePortfolio={vi.fn()}
      />
    );

    const auditBtn = screen.getByRole('button', { name: /Run 1-Click Portfolio Audit/i });
    await user.click(auditBtn);

    // Audit result displays breakdown metrics
    expect(await screen.findByText(/Portfolio Readiness Audit/i)).toBeInTheDocument();
    expect(screen.getByText(/Measurable Business Impact/i)).toBeInTheDocument();
  });

  it('renders STAR-method case study breakdown', async () => {
    const user = userEvent.setup();
    render(
      <AiAgentView
        portfolioData={initialPortfolioData}
        onUpdatePortfolio={vi.fn()}
      />
    );

    const starBtn = screen.getByRole('button', { name: /STAR-Method Case Study/i });
    await user.click(starBtn);

    expect(
      await screen.findByText(/STAR-Method Case Study Framework/i)
    ).toBeInTheDocument();
  });
});

describe('Editor Validated Form & Navigation', () => {
  it('updates form inputs when user types in profile name', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <EditorView
        data={initialPortfolioData}
        onChange={handleChange}
        onOpenAiPrompt={vi.fn()}
        onPreviewLive={vi.fn()}
      />
    );

    const nameInput = screen.getByDisplayValue(initialPortfolioData.profile.name);
    await user.clear(nameInput);
    await user.type(nameInput, 'Amina Ajaz');

    expect(handleChange).toHaveBeenCalled();
  });

  it('switches between editor navigation sections cleanly', async () => {
    const user = userEvent.setup();
    render(
      <EditorView
        data={initialPortfolioData}
        onChange={vi.fn()}
        onOpenAiPrompt={vi.fn()}
        onPreviewLive={vi.fn()}
      />
    );

    const themeTab = screen.getByRole('button', { name: /Theme & Styling/i });
    await user.click(themeTab);

    expect(
      screen.getByText(/Portfolio Theme & Visual Styling/i)
    ).toBeInTheDocument();
  });
});