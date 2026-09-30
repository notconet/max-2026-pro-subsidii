import { createFileRoute } from '@tanstack/react-router';
import SubsidyMatcher from '../components/SubsidyMatcher';

export const Route = createFileRoute('/subsidy-matcher')({
    component: SubsidyMatcher,
});