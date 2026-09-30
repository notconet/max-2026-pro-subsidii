import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { IconType } from 'react-icons';
import {
    PiBuildingsBold,
    PiFactoryBold,
    PiGearSixBold,
    PiGraduationCapBold,
    PiGridFourBold,
    PiMapPinBold,
    PiMonitorBold,
    PiPlantBold,
    PiRocketLaunchBold,
    PiScissorsBold,
    PiShoppingCartSimpleBold,
    PiTrendUpBold,
    PiUsersBold,
    PiWrenchBold,
} from 'react-icons/pi';

import styles from './SubsidyMatcher.module.css';

type Choice = {
    value: string;
    label: string;
    icon?: IconType;
    children?: Choice[];
};

type Step = {
    question: string;
    description: string;
    options: Choice[];
};

const steps: Step[] = [
    {
        question: 'Укажите отрасль бизнеса',
        description:
            'Выберите основную сферу деятельности - это поможет подобрать подходящие программы',
        options: [
            { value: 'services', label: 'Услуги', icon: PiScissorsBold },
            {
                value: 'trade',
                label: 'Торговля',
                icon: PiShoppingCartSimpleBold,
            },
            {
                value: 'production',
                label: 'Производство',
                icon: PiFactoryBold,
            },
            {
                value: 'technology',
                label: 'IT и технологии',
                icon: PiMonitorBold,
            },
            {
                value: 'agriculture',
                label: 'Сельское хозяйство',
                icon: PiPlantBold,
            },
            {
                value: 'other-industry',
                label: 'Другое',
                icon: PiGridFourBold,
                children: [
                    {
                        value: 'construction',
                        label: 'Строительство',
                        icon: PiWrenchBold,
                    },
                    {
                        value: 'transport',
                        label: 'Транспорт',
                        icon: PiBuildingsBold,
                    },
                    {
                        value: 'education',
                        label: 'Образование',
                        icon: PiGraduationCapBold,
                    },
                    {
                        value: 'healthcare',
                        label: 'Медицина',
                        icon: PiUsersBold,
                    },
                    { value: 'tourism', label: 'Туризм', icon: PiMapPinBold },
                    {
                        value: 'culture',
                        label: 'Культура',
                        icon: PiGraduationCapBold,
                    },
                    { value: 'sport', label: 'Спорт', icon: PiTrendUpBold },
                    {
                        value: 'household-services',
                        label: 'Бытовые услуги',
                        icon: PiWrenchBold,
                    },
                    {
                        value: 'real-estate',
                        label: 'Недвижимость',
                        icon: PiBuildingsBold,
                    },
                    {
                        value: 'energy',
                        label: 'Энергетика',
                        icon: PiGearSixBold,
                    },
                ],
            },
        ],
    },
    {
        question: 'В каком регионе вы ведёте деятельность?',
        description: 'Меры поддержки отличаются по регионам',
        options: [
            { value: 'moscow', label: 'г. Москва', icon: PiRocketLaunchBold },
            {
                value: 'saint-petersburg',
                label: 'г. Санкт-Петербург',
                icon: PiTrendUpBold,
            },
            {
                value: 'tatarstan',
                label: 'Республика Татарстан',
                icon: PiGearSixBold,
            },
            {
                value: 'khakassia',
                label: 'Республика Хакасия',
                icon: PiUsersBold,
            },
            {
                value: 'other-region',
                label: 'Другое',
                icon: PiGraduationCapBold,
                children: [
                    { value: 'adygea', label: 'Республика Адыгея' },
                    { value: 'altai', label: 'Республика Алтай' },
                    {
                        value: 'bashkortostan',
                        label: 'Республика Башкортостан',
                    },
                    { value: 'buryatia', label: 'Республика Бурятия' },
                    { value: 'dagestan', label: 'Республика Дагестан' },
                    { value: 'ingushetia', label: 'Республика Ингушетия' },
                    { value: 'kalmykia', label: 'Республика Калмыкия' },
                    { value: 'karelia', label: 'Республика Карелия' },
                    { value: 'komi', label: 'Республика Коми' },
                    { value: 'crimea', label: 'Республика Крым' },
                    { value: 'sakha', label: 'Республика Саха (Якутия)' },
                    { value: 'tuva', label: 'Республика Тыва' },
                    { value: 'chuvashia', label: 'Чувашская Республика' },
                    { value: 'krasnodar', label: 'Краснодарский край' },
                    { value: 'primorsky', label: 'Приморский край' },
                    { value: 'novosibirsk', label: 'Новосибирская область' },
                    { value: 'sverdlovsk', label: 'Свердловская область' },
                ],
            },
        ],
    },
    {
        question: 'Какой у вас статус?',
        description:
            'Выберите организационную форму и налоговый режим - это влияет на условия участия',
        options: [
            { value: 'ip-usn', label: 'ИП на УСН' },
            { value: 'ip-patent', label: 'ИП на патенте' },
            { value: 'self-employed', label: 'Самозанятый (НПД)' },
            { value: 'ip-osno', label: 'ИП на ОСНО' },
            { value: 'nko', label: 'НКО' },
            {
                value: 'other-status',
                label: 'Другое',
                icon: PiGridFourBold,
                children: [
                    { value: 'ooo-usn', label: 'ООО на УСН' },
                    { value: 'ooo-patent', label: 'ООО на патенте' },
                    { value: 'ao', label: 'АО' },
                    { value: 'kfh', label: 'КФХ' },
                    { value: 'other-nko', label: 'НКО' },
                    { value: 'other-legal-status', label: 'Другое' },
                ],
            },
        ],
    },
    {
        question: 'Для чего вам нужна субсидия?',
        description:
            'Выберите основную цель - мы покажем подходящие программы поддержки',
        options: [
            {
                value: 'start-business',
                label: 'Запуск нового бизнеса',
                icon: PiRocketLaunchBold,
            },
            {
                value: 'grow-business',
                label: 'Развитие действующего бизнеса',
                icon: PiTrendUpBold,
            },
            {
                value: 'equipment',
                label: 'Покупка оборудования',
                icon: PiGearSixBold,
            },
            {
                value: 'jobs',
                label: 'Создание рабочих мест',
                icon: PiUsersBold,
            },
            {
                value: 'training',
                label: 'Обучение сотрудников',
                icon: PiGraduationCapBold,
            },
            {
                value: 'other-goal',
                label: 'Другое',
                icon: PiGridFourBold,
                children: [
                    { value: 'materials', label: 'Сырьё и материалы' },
                    { value: 'premises', label: 'Ремонт помещения' },
                    { value: 'salary', label: 'Зарплата сотрудников' },
                    { value: 'taxes', label: 'Налоги' },
                    { value: 'certification', label: 'Сертификация' },
                    { value: 'leasing', label: 'Лизинг' },
                    { value: 'modernization', label: 'Модернизация' },
                    { value: 'digitalization', label: 'Цифровизация' },
                    { value: 'export', label: 'Экспорт' },
                    { value: 'opening', label: 'Открытие бизнеса' },
                    {
                        value: 'other-goal-detail',
                        label: 'Другое (поле ввода)',
                    },
                ],
            },
        ],
    },
];

export default function SubsidyMatcher() {
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [expandedOption, setExpandedOption] = useState<string | null>(null);

    const currentStep = steps[stepIndex];
    const selectedValue = answers[stepIndex];
    const progress = ((stepIndex + 1) / steps.length) * 100;

    const selectOption = (option: Choice) => {
        if (option.children) {
            setExpandedOption((current) =>
                current === option.value ? null : option.value,
            );
            setAnswers((current) => ({ ...current, [stepIndex]: '' }));
            return;
        }

        setExpandedOption(null);
        setAnswers((current) => ({ ...current, [stepIndex]: option.value }));
    };

    const selectChild = (parent: Choice, child: Choice) => {
        setAnswers((current) => ({
            ...current,
            [stepIndex]: `${parent.value}:${child.value}`,
        }));
    };

    const moveBack = () => {
        if (stepIndex === 0) {
            navigate({ to: '/' });
            return;
        }

        setStepIndex((current) => current - 1);
        setExpandedOption(null);
    };

    const moveNext = () => {
        if (!selectedValue) return;

        if (stepIndex === steps.length - 1) {
            navigate({ to: '/', hash: 'available-subsidies' });
            return;
        }

        setStepIndex((current) => current + 1);
        setExpandedOption(null);
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <button
                        className={styles.backButton}
                        type="button"
                        onClick={moveBack}
                        aria-label={
                            stepIndex === 0 ? 'Закрыть подбор' : 'Назад'
                        }
                    >
                        <span aria-hidden="true">‹</span>
                    </button>
                    <h2 className={styles.dialogTitle} id="matcher-title">
                        Подбор субсидии
                    </h2>
                </header>

                <div className={styles.progress}>
                    <div className={styles.progressLabels}>
                        <span>Подбор субсидии</span>
                        <span>
                            {stepIndex + 1} из {steps.length}
                        </span>
                    </div>
                    <div
                        className={styles.progressTrack}
                        role="progressbar"
                        aria-label="Прогресс подбора субсидии"
                        aria-valuemin={1}
                        aria-valuemax={steps.length}
                        aria-valuenow={stepIndex + 1}
                    >
                        <div
                            className={styles.progressValue}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className={styles.question}>
                    <h3>{currentStep.question}</h3>
                    <p>{currentStep.description}</p>
                </div>

                <div className={styles.options}>
                    {currentStep.options.map((option) => {
                        const isExpanded = expandedOption === option.value;
                        const isSelected = option.children
                            ? selectedValue?.startsWith(`${option.value}:`)
                            : selectedValue === option.value;
                        const Icon = option.icon;

                        return (
                            <div
                                className={styles.optionGroup}
                                key={option.value}
                            >
                                <button
                                    className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                                    type="button"
                                    aria-pressed={isSelected}
                                    aria-expanded={
                                        option.children ? isExpanded : undefined
                                    }
                                    onClick={() => selectOption(option)}
                                >
                                    <span
                                        className={styles.optionIcon}
                                        aria-hidden="true"
                                    >
                                        {Icon && <Icon />}
                                    </span>
                                    <span className={styles.optionLabel}>
                                        {option.label}
                                    </span>
                                    <span
                                        className={styles.radio}
                                        aria-hidden="true"
                                    >
                                        {isSelected && <span />}
                                    </span>
                                </button>

                                {option.children && isExpanded && (
                                    <div className={styles.childOptions}>
                                        {option.children.map((child) => {
                                            const ChildIcon = child.icon;
                                            const childValue = `${option.value}:${child.value}`;
                                            const childSelected =
                                                selectedValue === childValue;

                                            return (
                                                <button
                                                    className={`${styles.childOption} ${childSelected ? styles.childSelected : ''}`}
                                                    type="button"
                                                    key={child.value}
                                                    aria-pressed={childSelected}
                                                    onClick={() =>
                                                        selectChild(
                                                            option,
                                                            child,
                                                        )
                                                    }
                                                >
                                                    {ChildIcon && (
                                                        <ChildIcon aria-hidden="true" />
                                                    )}
                                                    <span>{child.label}</span>
                                                    <span
                                                        className={styles.radio}
                                                        aria-hidden="true"
                                                    >
                                                        {childSelected && (
                                                            <span />
                                                        )}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <footer className={styles.footer}>
                    <button
                        className={styles.nextButton}
                        type="button"
                        disabled={!selectedValue}
                        onClick={moveNext}
                    >
                        {stepIndex === steps.length - 1
                            ? 'Показать субсидии'
                            : 'Далее'}
                    </button>
                </footer>
            </div>
        </div>
    );
}
