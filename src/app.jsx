import { useState, useCallback, useEffect, useRef, useMemo } from "react";

const FRAMEWORK = {
  id: "root",
  label: "Trust &\nTransparency\nProgram",
  children: [
    {
      id: "secops", label: "Security\nOperations", color: "#3B82F6", icon: "🛡",
      children: [
        { id: "so1", label: "Threat Prevention", desc: "Asset management, firewalls, anti-malware, DLP, DNS security, DDoS protection, hardening, encryption & PKI, and endpoint security.", children: [
          { label: "Asset Management & Inventory", desc: "Comprehensive hardware/software asset inventory, discovery, and lifecycle tracking." },
          { label: "Firewall Management", desc: "Firewall rule management, review cadence, segmentation enforcement, and next-gen firewall capabilities." },
          { label: "Anti-Malware & EDR", desc: "Endpoint detection and response, anti-malware deployment, behavioral analysis, and threat containment." },
          { label: "Data Loss Prevention", desc: "DLP policies across email, web, endpoints, and cloud to prevent unauthorized data exfiltration." },
          { label: "DNS Security", desc: "DNS filtering, sinkholing, DNSSEC, and DNS-layer threat prevention." },
          { label: "DDoS Protection", desc: "Volumetric and application-layer DDoS mitigation, scrubbing services, and failover planning." },
          { label: "System Hardening", desc: "CIS benchmarks, baseline configurations, unnecessary service removal, and hardening validation." },
          { label: "Encryption & PKI", desc: "Certificate management, PKI infrastructure, encryption standards, and key lifecycle management." },
          { label: "Endpoint Security", desc: "Endpoint protection platforms, device control, application whitelisting, and host-based IPS." },
        ] },
        { id: "so2", label: "Vulnerability Management", desc: "Continuous scanning across OS, network, apps, containers, cloud, and OT. Risk-based prioritization (EPSS), mitigation SLAs, and metrics.", children: [
          { label: "Continuous Scanning", desc: "Vulnerability scanning across OS, network, application, container, cloud, and OT environments." },
          { label: "Risk-Based Prioritization (EPSS)", desc: "Using EPSS, CVSS, and business context to prioritize remediation efforts." },
          { label: "Mitigation SLAs", desc: "Defined remediation timelines by severity with escalation for overdue vulnerabilities." },
          { label: "Vulnerability Metrics & Reporting", desc: "Mean time to remediate, scan coverage, aging analysis, and executive dashboards." },
          { label: "Remediation Workflow", desc: "Ticketing integration, remediation assignment, verification scanning, and exception management." },
        ] },
        { id: "so3", label: "Threat Detection & SOC", desc: "SIEM/log correlation, IDS/IPS alerting, NetFlow analysis, threat hunting, insider threat detection, SOC operations, and ISAC partnerships.", children: [
          { label: "SIEM & Log Correlation", desc: "Centralized log management, correlation rules, alerting, and long-term retention." },
          { label: "IDS/IPS", desc: "Network and host-based intrusion detection and prevention with tuned signatures and behavioral rules." },
          { label: "Network Traffic Analysis", desc: "NetFlow, packet capture, east-west traffic visibility, and anomaly detection." },
          { label: "Threat Hunting", desc: "Proactive hypothesis-driven hunting, IOC sweeps, and behavioral analytics." },
          { label: "Insider Threat Detection", desc: "User behavior analytics, privileged user monitoring, and anomalous access detection." },
          { label: "SOC Operations & Staffing", desc: "SOC structure, shift coverage, analyst tiers, runbooks, and performance metrics." },
          { label: "ISAC Partnerships", desc: "Information sharing and analysis center memberships, threat sharing, and sector coordination." },
        ] },
        { id: "so4", label: "Offensive Security", desc: "Red/blue/purple team exercises, penetration testing, physical security assessments, social engineering resilience, and deception technologies." },
        { id: "so5", label: "Automation & Orchestration", desc: "SOAR playbooks, automated threat hunting, patching automation, risk scoring, compliance checks, and AI/ML-augmented detection." },
        { id: "so6", label: "Threat Intelligence", desc: "Threat intelligence feeds, IOC management, dark web monitoring, industry-specific intelligence, and TI platform integration." },
        { id: "so7", label: "Digital Forensics", desc: "Forensic readiness planning, evidence collection and chain of custody, memory/disk/network forensics, and e-discovery support." },
        { id: "so8", label: "Attack Surface Management", desc: "External attack surface discovery, shadow IT detection, continuous exposure monitoring, and internet-facing asset inventory." },
      ],
    },
    {
      id: "incident", label: "Incident Response\n& Disclosure", color: "#EF4444", icon: "📢",
      children: [
        { id: "ir1", label: "IR Capability & Playbooks", desc: "Incident response plans, playbook development and testing, readiness assessments, first responder training, and IR partner retainers.", children: [
          { label: "Incident Response Plans", desc: "Documented IR plans with roles, escalation paths, and communication templates." },
          { label: "Playbook Development & Testing", desc: "Scenario-specific playbooks (ransomware, data breach, insider threat) with regular testing." },
          { label: "Readiness Assessments", desc: "Periodic IR readiness evaluations against frameworks and lessons learned." },
          { label: "First Responder Training", desc: "Training for initial incident handlers on triage, evidence preservation, and escalation." },
          { label: "Forensic Investigation Capability", desc: "In-house or retainer-based forensic investigation for root cause analysis." },
          { label: "IR Partner Retainers", desc: "Pre-negotiated retainers with IR firms, legal counsel, and crisis communications." },
        ] },
        { id: "ir2", label: "Ransomware Resilience", desc: "Business impact analysis, containment strategy, backup adequacy testing, mock exercises, machine integrity checking, and BC/DR integration." },
        { id: "ir3", label: "Crisis Management", desc: "Crisis team activation protocols, executive decision frameworks, war room procedures, and cross-functional coordination." },
        { id: "ir4", label: "Stakeholder Communication", desc: "Tiered notification for customers, regulators, board, and partners. Media relations, SLA-driven disclosure timelines, and transparent status pages." },
        { id: "ir5", label: "Regulatory Notification", desc: "HIPAA breach notification, state AG requirements, SEC disclosure, GDPR 72-hour notification, DORA, and cross-jurisdiction coordination." },
        { id: "ir6", label: "Post-Incident Transparency", desc: "Blameless retrospectives, public postmortems, lessons-learned integration, control gap remediation, and supply chain incident management." },
        { id: "ir7", label: "Tabletop & Simulation", desc: "Scenario-based tabletop exercises, cross-functional simulations, executive-level exercises, and after-action reporting." },
        { id: "ir8", label: "Vulnerability Disclosure & Bug Bounty", desc: "Coordinated vulnerability disclosure programs, bug bounty operations, security.txt implementation, researcher relationship management, and disclosure SLAs." },
      ],
    },
    {
      id: "iam", label: "Identity & Access\nManagement", color: "#06B6D4", icon: "🔑",
      children: [
        { id: "ia1", label: "Identity Lifecycle", desc: "User provisioning, RBAC, HR integration, identity repositories (LDAP/AD/Cloud), unified profiles, and deprovisioning workflows." },
        { id: "ia2", label: "Authentication & MFA", desc: "Multi-factor authentication, passwordless, passkeys, authenticator apps, tokens, biometrics, and one-time passcodes." },
        { id: "ia3", label: "SSO & Federation", desc: "Single sign-on, SAML, OAuth, OpenID Connect, cross-cloud federation, and customer identity for ecommerce/mobile." },
        { id: "ia4", label: "Privileged Access (PAM)", desc: "Privileged access management, just-in-time access, session recording, break-glass procedures, and service account management." },
        { id: "ia5", label: "Zero Trust Identity", desc: "Continuous authentication, context-aware access, identity threat detection, device trust signals, and micro-segmented identity." },
        { id: "ia6", label: "Identity Governance (IGA)", desc: "Access certifications, separation of duties enforcement, role mining, entitlement reviews, and orphaned account detection." },
        { id: "ia7", label: "Non-Human Identities", desc: "Service accounts, API keys, machine identities, workload identity federation, certificate-based auth, and secrets rotation." },
        { id: "ia8", label: "Customer Identity (CIAM)", desc: "Customer registration flows, social login, progressive profiling, consent-aware identity, and account takeover protection." },
      ],
    },
    {
      id: "governance", label: "Governance\n& Strategy", color: "#8B5CF6", icon: "⚖",
      children: [
        { id: "gv1", label: "Strategy & Alignment", desc: "Business alignment, 1-3 year roadmap, corporate objectives mapping, continuous management updates, and expectations management." },
        { id: "gv2", label: "Frameworks & Standards", desc: "NIST CSF, ISO 27001, COSO, COBIT, ITIL, FAIR, FISMA, CMMC, and cross-framework visibility for multi-regulatory environments." },
        { id: "gv3", label: "Policies & RACI", desc: "Living policy library, security standards, roles and responsibilities (RACI), data ownership definitions, and exception management." },
        { id: "gv4", label: "Metrics & Board Reporting", desc: "Operational/executive metrics, control effectiveness, risk reduction tracking, ROSI, security debt quantification, and board presentations." },
        { id: "gv5", label: "Trust as Corporate Value", desc: "Transparency commitments, trust reporting, public trust scores, security as business differentiator, and trust brand building." },
        { id: "gv6", label: "Security Committee & Charter", desc: "Steering committee structure, charter, meeting cadence, cross-functional representation, and decision authority." },
        { id: "gv7", label: "Regulatory Intelligence", desc: "Regulatory horizon scanning, impact assessment, compliance roadmap, legislative tracking, and proactive regulatory engagement." },
        { id: "gv8", label: "Program Maturity Assessment", desc: "Maturity model benchmarking (CMM, C2M2), capability gap analysis, peer comparison, and continuous improvement planning." },
        { id: "gv9", label: "Governance-as-Code", desc: "Policy-as-code enforcement in pipelines, automated compliance verification, software-defined lifecycle governance, and machine-readable security policies." },
        { id: "gv10", label: "Security Evangelism", desc: "Internal security marketing, stakeholder awareness campaigns, security value communication, executive briefing programs, and culture-building initiatives." },
      ],
    },
    {
      id: "risk", label: "Risk Management\n& Compliance", color: "#A855F7", icon: "📊",
      children: [
        { id: "rm1", label: "Risk Assessment & CRQ", desc: "Ongoing risk assessments, cyber risk quantification (CRQ), FAIR methodology, and centralized risk register.", children: [
          { label: "Ongoing Risk Assessments", desc: "Regular risk assessment cycles with defined scope, methodology, and reporting." },
          { label: "Cyber Risk Quantification (CRQ)", desc: "Financial quantification of cyber risk using models like FAIR for executive communication." },
          { label: "FAIR Methodology", desc: "Factor Analysis of Information Risk implementation for consistent risk measurement." },
          { label: "Centralized Risk Register", desc: "Single source of truth for all identified risks with owners, ratings, and treatment plans." },
          { label: "Risk Scenario Modeling", desc: "Modeling specific threat scenarios with likelihood and impact projections." },
          { label: "Pen Test Integration", desc: "Incorporating penetration testing results into risk assessments and register updates." },
        ] },
        { id: "rm2", label: "Compliance & Audits", desc: "HIPAA/HITECH, PCI, SOX, CCPA/GDPR, SSAE 18, NIST/FISMA, CMMC, HITRUST, DORA, SEC, and regular audit management." },
        { id: "rm3", label: "Legal & Data Governance", desc: "Data discovery/ownership, vendor contracts, investigations/forensics, attorney-client privilege, data retention/destruction, and loss prevention." },
        { id: "rm4", label: "OT & Physical Security", desc: "Industrial control systems (PLCs, SCADA, HMIs), OT risk assessment, physical security, and IT/OT/IoT convergence." },
        { id: "rm5", label: "Cyber Risk Insurance", desc: "Coverage evaluation, ransomware inclusion, policy adequacy, claims readiness, and insurance as transparent risk transfer." },
        { id: "rm6", label: "Risk Appetite & Tolerance", desc: "Board-approved risk appetite statement, tolerance thresholds, risk acceptance criteria, and escalation triggers." },
        { id: "rm7", label: "Control Assurance", desc: "Control testing programs, effectiveness measurement, continuous control monitoring, and automated evidence collection." },
        { id: "rm8", label: "Regulatory Examination Readiness", desc: "Examiner relationship management, evidence preparation, finding remediation tracking, and consent order management." },
      ],
    },
    {
      id: "secarch", label: "Security\nArchitecture", color: "#0EA5E9", icon: "🏗",
      children: [
        { id: "sa1", label: "Zero Trust & SASE", desc: "Zero trust models/roadmap, SASE/SSE strategy, micro-segmentation, overlay networks, secure enclaves, and SDN." },
        { id: "sa2", label: "Defense-in-Depth", desc: "Network segmentation, application protection layers, remote access security, encryption technologies, and network function virtualization." },
        { id: "sa3", label: "Cloud & Hybrid Architecture", desc: "Multi-cloud security architecture, cloud-native application security, container security, service mesh, serverless security, and CSPM." },
        { id: "sa4", label: "Secure Design Review", desc: "Architecture review boards, security design patterns, reference architectures, and design-phase threat modeling." },
        { id: "sa5", label: "Resilient Design", desc: "Backup/replication/multi-site architecture, BC architecture, DR posture, infrastructure-as-code security, and chaos engineering." },
        { id: "sa6", label: "Data Security Architecture", desc: "Encryption at rest and in transit, tokenization, key management infrastructure, data masking, and database security." },
        { id: "sa7", label: "Network Security Architecture", desc: "Firewall architecture, DNS security design, east-west traffic inspection, network access control, and SD-WAN security." },
        { id: "sa8", label: "Endpoint Architecture", desc: "EDR/XDR strategy, endpoint hardening standards, mobile device architecture, and browser isolation." },
      ],
    },
    {
      id: "ai", label: "AI Governance\n& Responsible AI", color: "#F59E0B", icon: "🤖",
      children: [
        { id: "ai1", label: "AI Governance & Policy", desc: "AI governance framework, organizational policies, transparency requirements, LLM/agent oversight, and NIST AI RMF alignment." },
        { id: "ai2", label: "Responsible AI & Ethics", desc: "Safe/ethical use standards, algorithmic bias testing, fairness metrics, human-in-the-loop safeguards, explainability, and AI ethics board." },
        { id: "ai3", label: "Shadow AI & Inventory", desc: "AI system registry, shadow AI discovery, sanctioned tool catalog, use case review, and IP protection for AI outputs." },
        { id: "ai4", label: "Securing AI Systems", desc: "Adversarial attack defense, training/test data protection, prompt injection prevention, data poisoning, OWASP Top 10 for LLMs, and AI pen testing." },
        { id: "ai5", label: "Agentic AI & Autonomy", desc: "Guardrails for autonomous agents, permission boundaries, audit trails, kill-switch protocols, and human oversight thresholds." },
        { id: "ai6", label: "AI-Enabled Security", desc: "AI in threat detection, GenAI task automation, AI-augmented SOC operations, ML model training/retraining, and security use cases." },
        { id: "ai7", label: "AI Risk Assessment", desc: "Model risk management, AI-specific risk register, impact assessments, model validation, and drift detection." },
        { id: "ai8", label: "AI Supply Chain & Provenance", desc: "Model provenance tracking, training data lineage, third-party model risk, foundation model dependencies, and model cards." },
      ],
    },
    {
      id: "supply", label: "Supply Chain\nTransparency", color: "#10B981", icon: "🔗",
      children: [
        { id: "sc1", label: "Third-Party Risk (TPRM)", desc: "Vendor risk tiering, security assessments, contractual requirements, continuous monitoring, and TPRM automation.", children: [
          { label: "Vendor Risk Tiering", desc: "Classification of vendors by criticality, data access, and business impact for proportional assessment." },
          { label: "Security Questionnaires & Assessments", desc: "Standardized security questionnaires (SIG, CAIQ), on-site assessments, and evidence review." },
          { label: "Contractual Security Requirements", desc: "Security obligations in contracts including breach notification, audit rights, and data handling." },
          { label: "Continuous Monitoring", desc: "Ongoing vendor risk monitoring beyond point-in-time assessments using automated feeds and signals." },
          { label: "TPRM Automation & Tooling", desc: "Platforms and workflows for scaling vendor assessments, tracking remediation, and reporting." },
          { label: "Vendor Risk Remediation Tracking", desc: "Tracking vendor remediation of identified risks with SLAs and escalation paths." },
        ] },
        { id: "sc2", label: "Software Supply Chain", desc: "SBOM requirements, dependency scanning, open-source inventory, provenance verification, and build pipeline integrity.", children: [
          { label: "SBOM Generation & Management", desc: "Creating, maintaining, and sharing software bills of materials for all delivered software." },
          { label: "Dependency Scanning", desc: "Automated scanning of direct and transitive dependencies for known vulnerabilities." },
          { label: "Provenance Verification", desc: "Verifying the origin and integrity of software components through signatures and attestations." },
          { label: "Build Pipeline Integrity", desc: "Securing build systems, reproducible builds, and protecting against build-time tampering." },
          { label: "Artifact Signing", desc: "Cryptographic signing of build artifacts, container images, and release packages." },
          { label: "Open Source Governance", desc: "Policies for open source adoption, contribution, license compliance, and community engagement." },
        ] },
        { id: "sc3", label: "Procurement Security", desc: "Security requirements in RFPs, contract security language, security addenda, and vendor onboarding security gates." },
        { id: "sc4", label: "Continuous Vendor Monitoring", desc: "Real-time vendor risk scoring, breach notification feeds, financial health monitoring, and automated reassessment triggers." },
        { id: "sc5", label: "Concentration & 4th Party", desc: "Dependency mapping, single-point-of-failure analysis, Nth-party visibility, cascading obligations, and beyond-Tier-1 mapping." },
        { id: "sc6", label: "Cloud & SaaS Supply Chain", desc: "SaaS security posture assessment, cloud provider dependencies, shared responsibility gap analysis, and SaaS-to-SaaS integration risk." },
        { id: "sc7", label: "Vendor Transparency", desc: "Published vendor security standards, subprocessor lists, data flow disclosures, SLA transparency, and public vendor posture." },
        { id: "sc8", label: "Supply Chain Incidents", desc: "Software component inventory for IR, supply chain breach playbooks, vendor notification protocols, and coordinated disclosure." },
        { id: "sc9", label: "Regulatory & Compliance", desc: "EU Cyber Resilience Act, EO 14028, DORA ICT third-party provisions, NIS2 supply chain requirements, and cross-border vendor obligations." },
      ],
    },
    {
      id: "data", label: "Data Practices\n& Privacy", color: "#EC4899", icon: "🔐",
      children: [
        { id: "dp1", label: "Data Governance & Classification", desc: "Data discovery, classification, lineage, retention/destruction, access controls, and transparent lifecycle management." },
        { id: "dp2", label: "Privacy Engineering", desc: "Privacy-by-design, data minimization, purpose limitation, automated PIAs, encryption/masking, and DLP integration." },
        { id: "dp3", label: "Consent & Rights Management", desc: "Consent platforms, DSR fulfillment, preference centers, right-to-delete workflows, and CCPA/GDPR rights compliance." },
        { id: "dp4", label: "Cross-Border Data Flows", desc: "Transfer impact assessments, SCCs, adequacy decisions, data sovereignty, and jurisdictional mapping." },
        { id: "dp5", label: "Data Ethics", desc: "Ethical use policies, secondary use restrictions, anonymization standards, data ethics board, and customer-facing transparency." },
        { id: "dp6", label: "Privacy Program Management", desc: "Privacy office structure, privacy champions network, privacy training programs, and regulatory relationship management." },
        { id: "dp7", label: "Data Breach & Incident Response", desc: "Privacy-specific IR playbooks, breach notification workflows, regulatory reporting automation, and remediation tracking." },
        { id: "dp8", label: "Records Management", desc: "Retention schedules, legal hold management, records disposition, e-discovery readiness, and archival policies." },
      ],
    },
    {
      id: "appsec", label: "Application\nSecurity", color: "#F97316", icon: "💻",
      children: [
        { id: "as1", label: "Secure Development", desc: "Secure coding standards, code review gates, SAST/DAST integration, and source code analysis.", children: [
          { label: "Secure Coding Standards", desc: "Language-specific secure coding guidelines, banned function lists, and security linting rules enforced in CI." },
          { label: "Mandatory Code Review", desc: "Security-focused review gates with reviewer checklists and mandatory approval before merge." },
          { label: "SAST Integration", desc: "Static application security testing integrated into build pipelines with tuned rulesets and suppression management." },
          { label: "DAST Integration", desc: "Dynamic testing against running applications, authenticated scanning, and crawl coverage validation." },
          { label: "IDE Security Plugins", desc: "Real-time security feedback in developer IDEs for instant vulnerability detection during coding." },
          { label: "Developer Security Training", desc: "Hands-on secure coding training, CTF exercises, and language/framework-specific security workshops." },
        ] },
        { id: "as2", label: "Security Champions", desc: "Embedded security advocates in development teams, champion training programs, office hours, and escalation paths." },
        { id: "as3", label: "DevSecOps Pipeline", desc: "Security integration in CI/CD pipelines, IaC scanning, shift-left testing, change control, and file integrity monitoring.", children: [
          { label: "CI/CD Security Gates", desc: "Automated security quality gates that block builds failing security thresholds." },
          { label: "IaC Scanning", desc: "Infrastructure-as-code scanning for misconfigurations in Terraform, CloudFormation, Kubernetes manifests." },
          { label: "Shift-Left Testing", desc: "Security testing moved earlier in the SDLC with pre-commit hooks and PR-level scanning." },
          { label: "Change Control & Approval", desc: "Formal change management with security review requirements for production deployments." },
          { label: "File Integrity Monitoring", desc: "Detection of unauthorized changes to critical files, configurations, and binaries." },
          { label: "Pipeline Secret Detection", desc: "Automated scanning for leaked credentials, API keys, and tokens in CI/CD pipelines and artifacts." },
        ] },
        { id: "as4", label: "Threat Modeling", desc: "Architecture threat modeling, STRIDE/PASTA methodologies, design review gates, and data flow diagramming." },
        { id: "as5", label: "API Security", desc: "API inventory and discovery, authentication and authorization, rate limiting, input validation, and API-specific threat modeling.", children: [
          { label: "API Discovery & Inventory", desc: "Automated discovery and cataloging of all APIs including shadow and zombie APIs." },
          { label: "API Authentication & Authorization", desc: "OAuth/OIDC implementation, API key management, and fine-grained access control." },
          { label: "Rate Limiting & Throttling", desc: "API abuse prevention through request rate limits, throttling policies, and quota management." },
          { label: "Input Validation & Schema Enforcement", desc: "Request/response schema validation, payload size limits, and type enforcement." },
          { label: "API Threat Modeling", desc: "API-specific threat analysis including BOLA, BFLA, and OWASP API Security Top 10." },
          { label: "API Gateway Security", desc: "Centralized API gateway policies, TLS termination, request transformation, and logging." },
        ] },
        { id: "as6", label: "Web Application Defense", desc: "WAF management, application vulnerability testing, DDoS protection, bot management, and OWASP Top 10 coverage." },
        { id: "as7", label: "Mobile App Security", desc: "Mobile SAST/DAST, secure local storage, certificate pinning, app store security review, and jailbreak/root detection." },
        { id: "as8", label: "Container & Cloud-Native Security", desc: "Container image scanning, runtime protection, Kubernetes security policies, service mesh security, and serverless hardening." },
        { id: "as9", label: "Open Source & SCA", desc: "OSS component inventory, software composition analysis, license compliance, public repo security, and dependency tracking." },
        { id: "as10", label: "Secrets Management", desc: "Secrets detection in source code, vault integration, credential rotation policies, and certificate lifecycle management." },
        { id: "as11", label: "Development Environment Security", desc: "Development toolchain integrity, build system security, code repository hardening, developer endpoint protection, and artifact registry security." },
      ],
    },
    {
      id: "business", label: "Business\nEnablement", color: "#84CC16", icon: "🚀",
      children: [
        { id: "be1", label: "Cloud Strategy", desc: "Multi-cloud architecture, SaaS policy, vendor evaluation, SLAs, cloud log integration, and cloud-native posture management." },
        { id: "be2", label: "M&A Security", desc: "Acquisition risk assessment, integration cost estimation, IAM integration, security tools rationalization, and posture alignment." },
        { id: "be3", label: "IoT & Emerging Tech", desc: "IoT security frameworks, device security, protocols, device identity, OTA updates, edge computing, and quantum readiness." },
        { id: "be4", label: "Mobile & Remote Work", desc: "BYOD/MDM policies, mobile app inventory, secure remote access, attack surface management, and zero trust for distributed workforce." },
        { id: "be5", label: "Agility & Resilience", desc: "BC/DR planning, industry trend analysis, emerging technology evaluation, and digital transformation security enablement." },
        { id: "be6", label: "Customer Trust & Assurance", desc: "Trust center/portal, customer-facing security documentation, audit support packages, and transparency reporting." },
        { id: "be7", label: "Product Security", desc: "Security in product development lifecycle, customer-facing security features, and product vulnerability disclosure programs." },
        { id: "be8", label: "Security as Revenue Enabler", desc: "Sales enablement support, RFP/questionnaire management, competitive differentiation, and security certifications as deal accelerators." },
      ],
    },
    {
      id: "team", label: "Team & Culture\nManagement", color: "#D946EF", icon: "👥",
      children: [
        { id: "tm1", label: "Security Awareness & Training", desc: "Role-based security training, phishing simulations, awareness campaigns, culture metrics, and new hire onboarding.", children: [
          { label: "Role-Based Training", desc: "Tailored training programs for developers, executives, IT ops, and general staff based on role-specific risks." },
          { label: "Phishing Simulations", desc: "Regular phishing campaigns with progressive difficulty, targeted simulations, and remedial training." },
          { label: "Awareness Campaigns", desc: "Ongoing security awareness initiatives, security month events, newsletters, and gamification." },
          { label: "Culture Metrics", desc: "Measurement of security culture health through surveys, phishing click rates, and reporting rates." },
          { label: "New Hire Security Onboarding", desc: "Security orientation for all new employees covering policies, tools, and reporting." },
          { label: "Executive Security Briefings", desc: "Tailored security updates for executives covering threat landscape, risk posture, and strategic initiatives." },
        ] },
        { id: "tm2", label: "Security Champions Program", desc: "Champion recruitment and selection, training curriculum, office hours, cross-team advocacy, and recognition programs." },
        { id: "tm3", label: "Talent & Retention", desc: "Recruiting pipeline, performance management, retention strategies, burnout prevention, and FTE/contractor balance." },
        { id: "tm4", label: "Budget & Program Management", desc: "Budget management, business case development, CapEx/OpEx planning, tool rationalization, and consulting engagement." },
        { id: "tm5", label: "Skills Development", desc: "ML/AI skills, DevOps integration, MITRE ATT&CK proficiency, soft skills, IoT/OT expertise, and cross-training." },
        { id: "tm6", label: "Trust Culture", desc: "Internal transparency practices, open security reporting, blameless culture, security brand building, and trust values." },
        { id: "tm7", label: "Organizational Design", desc: "CISO reporting structure, team structure (centralized/federated/hybrid), RACI for security functions, and career pathing." },
        { id: "tm8", label: "Stakeholder Engagement", desc: "Executive relationship management, business unit partnerships, cross-functional working groups, and communication cadence." },
      ],
    },
  ],
};

// ========== EXHAUSTIVE DEPENDENCY GRAPH ==========
// [sourceId, targetId, reason]  — source "depends on" target
const DEP_EDGES = [
  // ===== SO1: Threat Prevention =====
  ["so1", "ia1", "Firewall rules and DLP policies require identity context — who the user is determines what gets blocked or allowed."],
  ["so1", "ia2", "MFA enforcement is a frontline prevention control that stops credential-based attacks before they start."],
  ["so1", "ia5", "Zero trust identity provides continuous verification that prevention controls use for real-time access decisions."],
  ["so1", "sa1", "Prevention controls are deployed within the zero trust architecture — micro-segmentation defines enforcement points."],
  ["so1", "sa2", "Defense-in-depth architecture determines where prevention controls are layered across the network."],
  ["so1", "sa3", "Cloud environments need cloud-native prevention controls — CASBs, cloud WAFs, and CSPM-driven blocking."],
  ["so1", "dp1", "DLP and content filtering need data classification to determine what's sensitive and what to block."],
  ["so1", "gv3", "Policies define acceptable use, blocking rules, and what constitutes a threat — prevention enforces policy."],
  ["so1", "gv2", "Framework controls (NIST CSF Protect) define the required prevention capabilities and their configuration."],
  ["so1", "rm4", "OT/ICS environments need adapted prevention controls — standard IT controls don't translate directly."],
  ["so1", "be4", "Remote work and BYOD expand the prevention perimeter — endpoint security must extend to uncontrolled devices."],
  ["so1", "tm1", "Awareness training is itself a prevention control — phishing-resistant users reduce the attack surface."],
  ["so1", "tm3", "Prevention tools require trained operators to configure, tune, and maintain them effectively."],
  ["so1", "so5", "Automated patching and hardening are prevention activities driven by the automation and analytics function."],
  ["so1", "so2", "Vulnerability findings drive prevention priorities — known exploited vulns trigger urgent hardening and blocking."],
  ["so1", "as6", "WAF is both an application defense and a threat prevention control for web-facing attack surfaces."],

  // ===== SO2: Vulnerability Management =====
  ["so2", "sc2", "SBOM and dependency scanning reveal supply chain vulnerabilities that internal scanning alone cannot find."],
  ["so2", "as9", "SCA findings from open-source components are a primary input to the vulnerability pipeline."],
  ["so2", "as1", "SAST/DAST findings from secure development feed directly into vulnerability tracking and remediation."],
  ["so2", "as5", "API-specific vulnerabilities must be discovered and tracked through the vuln management process."],
  ["so2", "sa4", "Vulnerability findings feed into the Secure SDLC to fix flaws before production deployment."],
  ["so2", "gv2", "Framework requirements define scanning scope, frequency, and remediation SLAs for vulnerability management."],
  ["so2", "gv3", "Policies define remediation timelines, risk acceptance criteria, and exception handling for vulnerabilities."],
  ["so2", "rm1", "Risk scoring and CRQ prioritize which vulnerabilities matter most — not all vulns are equal."],
  ["so2", "so5", "Automated scanning, ticket creation, and patching workflows are driven by the automation function."],
  ["so2", "tm3", "Vuln management requires dedicated staff to triage, validate, and drive remediation across teams."],
  ["so2", "tm5", "New vulnerability types (AI, IoT, OT) require new skills that the vuln management team must develop."],
  ["so2", "be1", "Cloud vulnerability scanning requires cloud-specific tools and integration with CSPM capabilities."],
  ["so2", "be3", "IoT device vulnerabilities need specialized scanning and firmware analysis capabilities."],
  ["so2", "rm4", "OT/ICS vulnerabilities have unique scanning constraints — active scanning can crash industrial systems."],
  ["so2", "ai4", "AI system vulnerabilities (prompt injection, model poisoning) must be integrated into vuln management."],
  ["so2", "dp1", "Data classification helps prioritize vulns — a critical vuln on a system holding PII is higher priority."],

  // ===== SO3: Threat Detection & SOC =====
  ["so3", "so5", "SOAR automation, AI-augmented triage, and automated hunting are force multipliers for detection."],
  ["so3", "ai6", "AI-enabled detection models power anomaly detection, behavioral analysis, and automated alert triage."],
  ["so3", "tm3", "SOC operations live and die on analyst staffing — burnout, gaps, and skill levels directly impact detection."],
  ["so3", "tm5", "Analysts need continuous skills development — MITRE ATT&CK proficiency, ML understanding, and threat intel skills."],
  ["so3", "ia4", "PAM monitoring and privileged session recording are critical detection inputs for insider threat."],
  ["so3", "ia5", "Zero trust identity signals (impossible travel, anomalous access) feed SOC detection rules."],
  ["so3", "sa2", "Defense-in-depth determines where detection sensors sit — network taps, host agents, and cloud logging points."],
  ["so3", "sa3", "Cloud-native logging (CloudTrail, Azure Monitor) must be integrated into the SOC's detection infrastructure."],
  ["so3", "gv2", "Frameworks define detection requirements — NIST CSF Detect function specifies monitoring capabilities."],
  ["so3", "so1", "Prevention logs (firewall blocks, DLP alerts, AV detections) are inputs to detection correlation."],
  ["so3", "so2", "Vulnerability context enriches alerts — a detection on an unpatched system is higher severity."],
  ["so3", "be1", "Cloud environments generate unique log sources that SOC must ingest and write detections for."],
  ["so3", "rm4", "OT/ICS monitoring requires specialized detection capabilities and understanding of industrial protocols."],
  ["so3", "tm4", "SOC tooling (SIEM, EDR, NDR) is a major budget line item managed through program budgeting."],
  ["so3", "as6", "Web application attack detection (WAF logs, bot detection) feeds into SOC correlation."],
  ["so3", "dp1", "Data classification context tells the SOC whether a detected exfiltration involves sensitive data or not."],

  // ===== SO4: Offensive Security =====
  ["so4", "rm1", "Offensive findings are primary inputs to risk assessments — they reveal real exploitability."],
  ["so4", "tm5", "Red teamers need continuous skills development in emerging TTPs, tools, and attack techniques."],
  ["so4", "tm3", "Offensive security requires specialized, hard-to-recruit talent — retention is critical."],
  ["so4", "gv3", "Engagement scoping, rules of engagement, and authorization are defined by organizational policies."],
  ["so4", "sa1", "Offensive testing validates zero trust architecture — can attackers move laterally despite segmentation?"],
  ["so4", "sa2", "Pen tests validate defense-in-depth — each layer's effectiveness is only proven under real attack simulation."],
  ["so4", "sa3", "Cloud pen testing validates cloud security architecture and CSPM effectiveness."],
  ["so4", "ia4", "PAM testing is a critical offensive focus — can red teamers escalate to privileged accounts?"],
  ["so4", "ia2", "MFA bypass testing validates authentication strength — social engineering and technical bypasses."],
  ["so4", "so3", "Red team exercises test SOC detection — if the SOC can't detect the red team, there are gaps."],
  ["so4", "ir1", "Offensive exercises test IR capability — tabletops and live simulations validate response readiness."],
  ["so4", "rm4", "Physical security and OT pen testing require specialized skills and safety-conscious methodologies."],
  ["so4", "as5", "API penetration testing validates API security controls — authentication, authorization, input validation."],
  ["so4", "as6", "Web application pen testing validates WAF effectiveness and application-layer defenses."],
  ["so4", "ai4", "AI red teaming tests AI system defenses — adversarial prompts, model extraction, and data poisoning."],
  ["so4", "sc1", "Third-party security is validated through offensive testing of vendor integrations and shared environments."],
  ["so4", "be3", "IoT device pen testing reveals firmware vulnerabilities and hardware attack surfaces."],
  ["so4", "tm1", "Social engineering testing validates security culture — are employees actually following awareness training?"],

  // ===== SO5: Automation & Analytics =====
  ["so5", "ai6", "AI/ML models power intelligent automation — from alert triage to automated threat hunting."],
  ["so5", "gv4", "Automated metrics collection feeds board reporting and control effectiveness measurement."],
  ["so5", "tm5", "Building and maintaining automation requires DevOps, scripting, and ML engineering skills."],
  ["so5", "tm3", "Automation strategy and tooling need dedicated engineering staff to build and maintain."],
  ["so5", "sa3", "Cloud-native automation leverages cloud APIs, IaC, and serverless functions for security orchestration."],
  ["so5", "gv3", "Automation encodes policy — playbooks must accurately reflect organizational standards and procedures."],
  ["so5", "rm2", "Automated compliance checks validate control configurations against regulatory requirements continuously."],
  ["so5", "as3", "DevSecOps pipelines are security automation — CI/CD security tooling shares infrastructure with SOAR."],
  ["so5", "tm4", "Automation tooling (SOAR, scripts, ML infrastructure) is a budget-managed capability."],

  // ===== IR1: IR Capability & Playbooks =====
  ["ir1", "so3", "Incident detection triggers come from the SOC — without detection, there is nothing to respond to."],
  ["ir1", "tm3", "IR capability depends on trained, available responders — staffing gaps mean slower containment."],
  ["ir1", "rm1", "Risk assessments prioritize which systems get playbooks and define acceptable response SLAs."],
  ["ir1", "gv3", "IR policies define authority, escalation paths, and decision-making rights during incidents."],
  ["ir1", "gv2", "Frameworks (NIST CSF Respond/Recover) define IR capability requirements and maturity expectations."],
  ["ir1", "rm3", "Legal counsel is embedded in IR — privilege considerations, evidence preservation, and regulatory obligations."],
  ["ir1", "tm5", "IR skills require continuous development — forensics, malware analysis, and cloud IR techniques evolve rapidly."],
  ["ir1", "so4", "Offensive exercises (tabletops, live simulations) test and validate IR playbook effectiveness."],
  ["ir1", "ia4", "Incident containment often requires emergency privileged access — PAM must support break-glass procedures."],
  ["ir1", "so5", "SOAR playbooks automate IR workflows — automated containment, ticket creation, and evidence collection."],
  ["ir1", "sc8", "Supply chain incident playbooks must integrate with broader IR capability for vendor-triggered events."],
  ["ir1", "sa5", "Recovery playbooks depend on resilient architecture — backup locations, failover procedures, and restore sequences."],

  // ===== IR2: Ransomware Resilience =====
  ["ir2", "sa5", "Recovery depends entirely on resilient architecture — backup integrity, replication, and multi-site design."],
  ["ir2", "rm5", "Cyber insurance provides financial backstop and often dictates ransomware response decisions."],
  ["ir2", "be5", "BC/DR plans must integrate ransomware-specific containment and recovery strategies."],
  ["ir2", "ir1", "Ransomware response executes through the broader IR capability — playbooks, teams, and forensics."],
  ["ir2", "so3", "Early ransomware detection (pre-encryption behavioral indicators) is critical for containment."],
  ["ir2", "so1", "Endpoint prevention controls (EDR, anti-malware) are the first line against ransomware execution."],
  ["ir2", "ia4", "Ransomware actors target privileged accounts — PAM is critical for preventing lateral movement."],
  ["ir2", "sa2", "Network segmentation limits ransomware blast radius — defense-in-depth contains the spread."],
  ["ir2", "tm1", "User awareness prevents initial ransomware delivery — phishing is the primary entry vector."],
  ["ir2", "gv4", "Ransomware BIA findings feed board reporting — leadership needs to understand the financial exposure."],
  ["ir2", "rm1", "Ransomware risk must be quantified in the risk register with business impact and likelihood."],

  // ===== IR3: Stakeholder Communication =====
  ["ir4", "gv5", "Communication credibility is built on pre-existing trust commitments and transparency culture."],
  ["ir4", "ir5", "Regulatory notification timelines constrain when and how stakeholders can be informed."],
  ["ir4", "gv4", "Board reporting infrastructure enables rapid escalation and accurate impact communication."],
  ["ir4", "rm3", "Legal review is mandatory for external communications — privilege, liability, and regulatory language."],
  ["ir4", "gv3", "Communication policies define who speaks, when, through what channels, and with what approvals."],
  ["ir4", "ir1", "Communication is only as good as the IR team's understanding of the incident — forensic findings drive messaging."],
  ["ir4", "tm6", "Trust culture determines whether internal teams share information freely or hide problems."],
  ["ir4", "dp3", "If a breach involves personal data, consent and rights management informs how affected individuals are notified."],
  ["ir4", "sc7", "When vendor incidents impact your organization, vendor transparency reporting quality determines communication speed."],

  // ===== IR4: Regulatory Notification =====
  ["ir5", "rm2", "Compliance requirements define notification timelines — HIPAA, GDPR 72-hour, SEC, DORA, state AG."],
  ["ir5", "rm3", "Legal counsel guides notification language, privilege considerations, and multi-jurisdiction obligations."],
  ["ir5", "dp1", "Data governance determines what data was affected — classification drives regulatory obligation assessment."],
  ["ir5", "dp4", "Cross-border data flow mapping determines which jurisdictions' notification rules apply."],
  ["ir5", "gv2", "Framework requirements define notification obligations and documentation standards."],
  ["ir5", "ir1", "Forensic findings from IR determine the scope, nature, and timing of regulatory notifications."],

  // ===== IR5: Post-Incident Transparency =====
  ["ir6", "tm6", "Blameless retrospectives only work in trust cultures — without psychological safety, people hide information."],
  ["ir6", "gv5", "Public postmortems are a direct expression of the organization's trust and transparency commitment."],
  ["ir6", "ir1", "Post-incident analysis depends on thorough forensic investigation and documented response actions."],
  ["ir6", "gv4", "Lessons-learned findings feed metrics and board reporting — was risk reduced after remediation?"],
  ["ir6", "so2", "Post-incident vulnerability remediation feeds back into the vulnerability management pipeline."],
  ["ir6", "so3", "Detection gaps revealed during incidents drive SOC detection rule improvements and tuning."],
  ["ir6", "gv3", "Policy gaps identified during incidents trigger policy updates and new standards."],
  ["ir6", "sa2", "Architecture weaknesses found in incidents drive defense-in-depth improvements."],
  ["ir6", "sc8", "Supply chain incident postmortems reveal vendor transparency gaps and contractual shortcomings."],

  // ===== IA1: Identity Lifecycle =====
  ["ia1", "gv3", "Identity policies define who gets access to what, provisioning/deprovisioning rules, and access governance."],
  ["ia1", "rm3", "Legal and HR requirements shape identity lifecycle — data retention, regulatory obligations, and employment law."],
  ["ia1", "rm2", "Compliance frameworks mandate access reviews, certification cycles, and identity audit trails."],
  ["ia1", "be2", "M&A events trigger massive identity integration projects — merging directories is day-one critical."],
  ["ia1", "tm4", "IAM platform licensing, staffing, and tooling are budget-managed capabilities."],
  ["ia1", "dp1", "Data governance determines which identity attributes are collected, retained, and how long they're kept."],
  ["ia1", "sa3", "Cloud identity management must federate across multi-cloud environments with consistent lifecycle rules."],

  // ===== IA2: Authentication & MFA =====
  ["ia2", "ia1", "Authentication mechanisms enforce identity decisions — MFA only works if the underlying identity is accurate."],
  ["ia2", "sa1", "Zero trust requires strong, continuous authentication at every access point."],
  ["ia2", "gv3", "Authentication policies define which methods are acceptable, where MFA is mandatory, and exception criteria."],
  ["ia2", "tm1", "Users must be trained on authentication methods — MFA enrollment, phishing-resistant auth, and social engineering."],
  ["ia2", "be4", "Remote work requires robust authentication — MFA is even more critical when devices are unmanaged."],
  ["ia2", "gv2", "Framework controls specify authentication strength requirements for different system risk levels."],

  // ===== IA3: SSO & Federation =====
  ["ia3", "be1", "Cloud strategy dictates federation topology — SaaS, IaaS, and PaaS all need SSO integration."],
  ["ia3", "ia1", "Federation depends on accurate identity lifecycle — stale identities in federated directories create orphaned access."],
  ["ia3", "sa3", "Multi-cloud architecture requires federated identity across cloud providers with consistent access controls."],
  ["ia3", "sc1", "Third-party vendor access often requires federation — TPRM must evaluate vendor identity practices."],
  ["ia3", "gv3", "Federation policies define trust relationships, which IdPs are authoritative, and cross-org access rules."],
  ["ia3", "dp3", "Customer identity federation must respect consent — users control what attributes are shared across services."],

  // ===== IA4: Privileged Access (PAM) =====
  ["ia4", "so3", "PAM monitoring feeds SOC detection — privileged session recording and anomalous access trigger alerts."],
  ["ia4", "rm1", "Privileged access scope is defined by risk assessments — which accounts are critical, which need JIT."],
  ["ia4", "gv3", "PAM policies define JIT rules, approval workflows, session recording requirements, and break-glass procedures."],
  ["ia4", "rm2", "Compliance frameworks mandate PAM controls — PCI requires restricted admin access, SOX mandates audit trails."],
  ["ia4", "as5", "API secrets management is a PAM function — API keys, tokens, and service accounts need privileged handling."],
  ["ia4", "ai5", "AI agents with system access need PAM — agentic AI credentials must be scoped, rotated, and monitored."],
  ["ia4", "sa3", "Cloud environments create unique privileged access challenges — cloud admin consoles, IaC credentials, and API keys."],

  // ===== IA5: Zero Trust Identity =====
  ["ia5", "sa1", "Zero trust identity is the enforcement layer for zero trust architecture — identity IS the perimeter."],
  ["ia5", "ai6", "Continuous/adaptive authentication leverages AI models for behavioral analysis and risk scoring."],
  ["ia5", "ia2", "Zero trust identity depends on strong authentication foundations — it extends MFA into continuous verification."],
  ["ia5", "ia1", "Zero trust decisions require real-time identity context — role, device, location, and behavior."],
  ["ia5", "so3", "Identity threat detection signals feed SOC correlation — compromised credential indicators are detection inputs."],
  ["ia5", "be3", "IoT device identity is a zero trust challenge — devices need cryptographic identity and attestation."],
  ["ia5", "be4", "Remote/mobile access is fundamentally a zero trust identity problem — context-aware access decisions."],
  ["ia5", "gv1", "Zero trust is a strategic transformation requiring executive sponsorship and multi-year roadmap."],

  // ===== GV1: Strategy & Alignment =====
  ["gv1", "rm1", "Strategy must be informed by actual risk posture — quantified cyber risk drives strategic priorities."],
  ["gv1", "gv4", "Metrics validate whether strategy is working — without measurement, alignment is aspirational."],
  ["gv1", "tm4", "Strategy execution requires budget — unfunded strategies are just wishes."],
  ["gv1", "gv2", "Framework selection shapes the strategic roadmap — the chosen framework defines what 'good' looks like."],
  ["gv1", "be5", "Business resilience requirements shape security strategy — the strategy must enable business objectives."],
  ["gv1", "gv5", "Trust commitments must be baked into strategy — not bolted on as an afterthought."],

  // ===== GV2: Frameworks & Standards =====
  ["gv2", "rm2", "Compliance obligations determine which frameworks are mandatory vs. aspirational."],
  ["gv2", "gv1", "Framework selection is a strategic decision — it shapes the entire program structure."],
  ["gv2", "rm1", "Risk management methodology must align with chosen frameworks (NIST, FAIR, ISO)."],

  // ===== GV3: Policies & RACI =====
  ["gv3", "gv1", "Policies operationalize strategy — they translate strategic intent into enforceable standards."],
  ["gv3", "rm3", "Legal requirements constrain and shape policy content, especially data handling and retention."],
  ["gv3", "gv2", "Policies must align with framework controls — NIST, ISO, and CMMC all mandate specific policy areas."],
  ["gv3", "rm2", "Compliance audit findings often trigger policy updates and new standards."],

  // ===== GV4: Metrics & Board Reporting =====
  ["gv4", "so5", "Automated tooling provides raw data for executive metrics aggregation."],
  ["gv4", "rm1", "CRQ and FAIR outputs directly feed board-level risk metrics — dollars at risk, loss exposure."],
  ["gv4", "gv1", "Metrics must measure strategic progress — KPIs aligned to the security strategy roadmap."],
  ["gv4", "tm4", "Budget justification requires ROI metrics — metrics demonstrate program value to leadership."],
  ["gv4", "rm2", "Audit findings and compliance posture are core board metrics."],
  ["gv4", "so2", "Vulnerability metrics (mean time to remediate, SLA adherence) are fundamental operational metrics."],
  ["gv4", "so3", "SOC metrics (MTTR, MTTD, alert volume) are primary operational health indicators."],

  // ===== GV5: Trust as Corporate Value =====
  ["gv5", "ir4", "Trust is tested in crisis — stakeholder communication during incidents is the ultimate trust test."],
  ["gv5", "tm6", "External trust commitments ring hollow without internal culture that practices transparency."],
  ["gv5", "dp5", "Data ethics commitments are foundational to credible trust and transparency programs."],
  ["gv5", "sc7", "Vendor transparency reporting demonstrates supply chain trust commitment to customers."],
  ["gv5", "ir6", "Public postmortems are a tangible trust artifact — they show accountability in action."],
  ["gv5", "ai2", "Responsible AI is a trust commitment — opaque AI undermines stakeholder confidence."],
  ["gv5", "gv4", "Trust metrics must be measured and reported — trust without measurement is just marketing."],
  ["gv5", "gv1", "Trust must be a strategic priority, not a tactical afterthought — it requires leadership commitment."],

  // ===== RM1: Risk Assessment & CRQ =====
  ["rm1", "so2", "Vulnerability data drives risk scoring — unpatched vulns increase quantified risk exposure."],
  ["rm1", "so4", "Pen test and red team findings reveal real-world exploitability that informs risk quantification."],
  ["rm1", "gv2", "Risk methodology must align with chosen frameworks — FAIR, NIST, ISO 31000."],
  ["rm1", "sc1", "Third-party risk assessments feed the organizational risk register — vendor risk is organizational risk."],
  ["rm1", "ai3", "Shadow AI systems represent unquantified risk — discovery findings feed the risk register."],
  ["rm1", "be1", "Cloud adoption decisions must be informed by risk assessment — each SaaS vendor adds risk."],
  ["rm1", "dp1", "Data classification determines what's at stake — PII exposure is a different risk than internal docs."],
  ["rm1", "rm4", "OT/ICS systems carry safety-critical risk that standard IT risk models may underestimate."],
  ["rm1", "gv4", "Risk register outputs feed board metrics — CRQ translates risk into financial terms leadership understands."],

  // ===== RM2: Compliance & Audits =====
  ["rm2", "gv2", "Compliance requirements are mapped from the framework landscape — which regulations apply where."],
  ["rm2", "dp1", "Data governance is prerequisite for demonstrating compliance — auditors need classification and lineage evidence."],
  ["rm2", "gv3", "Policies are audit evidence — auditors verify that policies exist, are current, and are enforced."],
  ["rm2", "so5", "Automated compliance checks continuously validate control configurations against regulatory requirements."],
  ["rm2", "ia1", "Access reviews and identity governance are primary audit focus areas across all frameworks."],
  ["rm2", "dp2", "Privacy engineering controls (PIAs, data minimization) are audited under GDPR, CCPA, and HIPAA."],
  ["rm2", "rm3", "Legal counsel interprets regulatory requirements and advises on compliance strategy."],
  ["rm2", "tm4", "Audit preparation and remediation consume budget — external auditors, tools, and staff time."],

  // ===== RM3: Legal & Data Governance =====
  ["rm3", "dp1", "Legal data governance depends on knowing what data exists, where it lives, and who owns it."],
  ["rm3", "sc1", "Vendor contracts and data processing agreements are negotiated through legal."],
  ["rm3", "gv3", "Legal requirements shape policy — data retention, destruction, and handling obligations."],
  ["rm3", "dp4", "Cross-border data transfer legal analysis determines where data can flow."],
  ["rm3", "rm2", "Legal interprets compliance requirements and advises on regulatory strategy."],
  ["rm3", "ai1", "AI governance policies require legal review — IP, liability, and regulatory compliance for AI systems."],

  // ===== RM4: OT & Physical Security =====
  ["rm4", "so1", "OT needs adapted prevention controls — IT security tools can disrupt industrial processes."],
  ["rm4", "be3", "IoT proliferation expands the OT attack surface — converged risk management is required."],
  ["rm4", "so3", "OT monitoring requires specialized detection — industrial protocols and safety system alerting."],
  ["rm4", "so2", "OT vulnerability management has unique constraints — patching may require production downtime."],
  ["rm4", "tm5", "OT security requires specialized skills — Purdue model, industrial protocols, and safety system knowledge."],
  ["rm4", "sa2", "OT network segmentation (IT/OT boundary) is a critical defense-in-depth design decision."],
  ["rm4", "gv3", "OT security policies must balance cybersecurity requirements with safety and operational continuity."],

  // ===== RM5: Cyber Risk Insurance =====
  ["rm5", "rm1", "Underwriting and coverage are informed by risk assessment outputs — better posture means better terms."],
  ["rm5", "ir1", "Insurers evaluate IR maturity — strong IR capability leads to better coverage and lower premiums."],
  ["rm5", "ir2", "Ransomware-specific coverage requirements depend on demonstrated backup and recovery capability."],
  ["rm5", "gv4", "Insurance costs and coverage details are board-level reporting items for risk governance."],
  ["rm5", "so4", "Insurers increasingly require pen test results and red team assessments as evidence of security posture."],
  ["rm5", "rm2", "Compliance posture (SOC 2, ISO 27001 cert) affects insurability and premium pricing."],
  ["rm5", "ia2", "MFA deployment is a near-universal insurance underwriting requirement."],

  // ===== SA1: Zero Trust & SASE =====
  ["sa1", "ia5", "Zero trust architecture is fundamentally dependent on identity as the new perimeter."],
  ["sa1", "gv1", "Zero trust is a strategic transformation requiring executive buy-in and multi-year roadmap."],
  ["sa1", "ia2", "Strong authentication is a prerequisite — zero trust fails without continuous identity verification."],
  ["sa1", "sa2", "Zero trust builds on defense-in-depth — micro-segmentation layers on top of network segmentation."],
  ["sa1", "be4", "Remote/mobile work is a primary zero trust driver — distributed workforce needs identity-centric access."],
  ["sa1", "tm4", "SASE/SSE platform investments are major capital expenditures requiring budget approval."],
  ["sa1", "be1", "Cloud-first strategies accelerate zero trust adoption — SASE converges networking and security for cloud."],

  // ===== SA2: Defense-in-Depth =====
  ["sa2", "so1", "Prevention controls are deployed at each defense layer — firewalls, IPS, endpoint, and encryption."],
  ["sa2", "gv2", "Frameworks define defense-in-depth control requirements and configuration baselines."],
  ["sa2", "sa1", "Micro-segmentation and zero trust extend traditional defense-in-depth into identity-aware layers."],
  ["sa2", "rm1", "Risk assessment identifies which layers need strengthening based on actual threat and asset exposure."],

  // ===== SA3: Cloud & Hybrid Architecture =====
  ["sa3", "be1", "Cloud security architecture must mirror the organization's cloud strategy and multi-cloud reality."],
  ["sa3", "ia3", "Cloud environments depend on federated SSO for unified access across SaaS, IaaS, and PaaS."],
  ["sa3", "gv3", "Cloud security policies define acceptable services, configurations, and data residency requirements."],
  ["sa3", "rm1", "Cloud architecture decisions must be risk-informed — each cloud service introduces unique risk profiles."],
  ["sa3", "sc1", "Cloud vendors are third parties — their security posture must be assessed through TPRM."],
  ["sa3", "ia4", "Cloud admin consoles and IaC credentials are privileged access that PAM must govern."],

  // ===== SA4: Secure SDLC =====
  ["sa4", "as3", "Secure SDLC is operationalized through DevSecOps pipeline integration — tooling in CI/CD."],
  ["sa4", "as1", "SDLC security starts with secure development practices — code review, SAST, and training."],
  ["sa4", "gv3", "SDLC policies define security requirements at each development phase — design, build, test, deploy."],
  ["sa4", "rm1", "Threat modeling during design is a risk assessment activity applied to specific applications."],
  ["sa4", "dp2", "Privacy-by-design requirements must be embedded in the SDLC — PIAs during design, not after."],
  ["sa4", "ai4", "AI/ML application development needs SDLC security adapted for model training and data pipelines."],
  ["sa4", "so2", "SAST/DAST findings from the SDLC pipeline feed into the vulnerability management process."],

  // ===== SA5: Resilient Design =====
  ["sa5", "be5", "Resilience serves business continuity — architecture decisions enable or constrain recovery speed."],
  ["sa5", "sa3", "Multi-cloud and hybrid architecture provides the redundancy resilient design requires."],
  ["sa5", "ir2", "Ransomware recovery depends on resilient architecture — backup integrity and failover capability."],
  ["sa5", "gv1", "Resilience investment is a strategic decision — it requires leadership to prioritize availability."],
  ["sa5", "rm1", "BIA findings from risk assessment determine which systems need what level of resilience."],
  ["sa5", "tm4", "Multi-site, replication, and backup infrastructure are significant budget items."],

  // ===== AI1: AI Governance & Policy =====
  ["ai1", "gv1", "AI governance must align with broader security and business strategy."],
  ["ai1", "gv3", "AI policies are an extension of the organizational policy framework."],
  ["ai1", "gv2", "AI governance aligns with emerging frameworks — NIST AI RMF, ISO 42001, EU AI Act."],
  ["ai1", "rm3", "Legal review is essential for AI policies — IP, liability, and regulatory implications."],
  ["ai1", "rm2", "AI compliance requirements are emerging — EU AI Act, state-level AI regulations, and sector-specific rules."],
  ["ai1", "dp5", "AI governance and data ethics are inseparable — AI policy must address ethical data use."],

  // ===== AI2: Responsible AI & Ethics =====
  ["ai2", "dp5", "Responsible AI and data ethics are deeply intertwined — biased data produces biased AI."],
  ["ai2", "gv5", "Responsible AI is a trust commitment — transparent AI builds stakeholder confidence."],
  ["ai2", "ai1", "Ethical AI principles must be codified in governance policy before they can be operationalized."],
  ["ai2", "dp1", "Bias testing requires understanding training data lineage, classification, and representativeness."],
  ["ai2", "gv3", "Responsible AI standards need organizational policy backing to be enforceable."],
  ["ai2", "tm5", "Teams need training on AI ethics, bias identification, and fairness testing methodologies."],

  // ===== AI3: Shadow AI & Inventory =====
  ["ai3", "ai1", "Shadow AI discovery is only meaningful with a governance framework to evaluate against."],
  ["ai3", "rm1", "Unsanctioned AI systems represent unquantified risk — findings feed the risk register."],
  ["ai3", "dp1", "Shadow AI may be processing classified/sensitive data without appropriate controls."],
  ["ai3", "so3", "Network monitoring and DLP can help detect unauthorized AI service usage (shadow AI)."],
  ["ai3", "dp2", "Shadow AI may violate privacy engineering requirements — data minimization, PIAs, consent."],
  ["ai3", "sc1", "Third-party AI tools used without approval introduce unassessed vendor risk."],
  ["ai3", "gv3", "Acceptable use policies define what AI tools are sanctioned and which are prohibited."],
  ["ai3", "ia1", "Identity and access controls determine who can provision and access AI services."],

  // ===== AI4: Securing AI Systems =====
  ["ai4", "so2", "AI vulnerabilities (prompt injection, model poisoning) must be in the vuln management pipeline."],
  ["ai4", "sc2", "AI model supply chains (pre-trained models, datasets, libraries) need software supply chain rigor."],
  ["ai4", "as1", "Securing AI apps requires secure development adapted for ML pipelines — code review, testing."],
  ["ai4", "sa4", "AI application security must be integrated into the Secure SDLC — threat modeling for AI systems."],
  ["ai4", "dp1", "Training data must be classified and protected — data governance applies to AI data pipelines."],
  ["ai4", "dp2", "AI training data may contain PII — privacy engineering controls (anonymization, PIAs) apply."],
  ["ai4", "so4", "AI red teaming validates AI system defenses through adversarial testing."],
  ["ai4", "so1", "AI system endpoints need standard prevention controls — network security, endpoint protection."],
  ["ai4", "ia4", "AI system service accounts and API keys require PAM controls."],

  // ===== AI5: Agentic AI & Autonomy =====
  ["ai5", "ai2", "Agentic AI guardrails must encode responsible AI principles — autonomy without ethics is reckless."],
  ["ai5", "ia4", "AI agents with system access need PAM — credentials must be scoped, rotated, and monitored."],
  ["ai5", "ai1", "Agent permission boundaries and kill-switch requirements must be defined in AI governance policy."],
  ["ai5", "so3", "Agent activity must be monitored by the SOC — anomalous agent behavior is a detection use case."],
  ["ai5", "rm1", "Agentic AI risk must be quantified — what's the blast radius of an autonomous agent gone wrong?"],
  ["ai5", "gv3", "Autonomy thresholds and human oversight requirements must be codified in policy."],
  ["ai5", "dp2", "Agents accessing personal data must respect privacy controls — purpose limitation and data minimization."],

  // ===== AI6: AI-Enabled Security =====
  ["ai6", "tm5", "Security teams need ML/AI skills to operate, tune, and validate AI-enabled tools."],
  ["ai6", "so3", "AI augments SOC operations — it depends on existing detection infrastructure and data feeds."],
  ["ai6", "tm3", "AI tooling shifts skill requirements — hiring profiles must evolve for AI-augmented operations."],
  ["ai6", "so5", "AI-enabled security is a form of automation — it shares infrastructure with SOAR."],
  ["ai6", "ai4", "AI security tools must themselves be secured — they're AI systems subject to adversarial attack."],
  ["ai6", "tm4", "AI/ML security tooling is a significant budget item — licensing, compute, and talent."],
  ["ai6", "gv4", "AI tool effectiveness must be measured — false positive rates, detection improvements, and ROI."],

  // ===== SC1: Third-Party Risk (TPRM) =====
  ["sc1", "rm1", "Vendor risk assessments use organizational risk methodology and feed the enterprise risk register."],
  ["sc1", "rm3", "Vendor contracts, DPAs, and liability terms are negotiated through legal."],
  ["sc1", "so5", "TPRM automation depends on integration with broader security automation capabilities."],
  ["sc1", "gv3", "TPRM policies define vendor risk tiers, assessment requirements, and acceptable risk thresholds."],
  ["sc1", "gv2", "Framework requirements define TPRM obligations — NIST, CMMC, HIPAA all mandate vendor oversight."],
  ["sc1", "dp4", "Vendors processing data across borders trigger cross-border data flow obligations."],
  ["sc1", "rm2", "Vendor compliance certifications (SOC 2, ISO 27001) are primary TPRM assessment inputs."],
  ["sc1", "dp1", "Data governance determines what data vendors access — classification drives assessment rigor."],

  // ===== SC2: Software Supply Chain =====
  ["sc2", "as9", "SCA is the technical mechanism enabling SBOM generation and dependency vulnerability tracking."],
  ["sc2", "so2", "Supply chain vulnerabilities flow into the vulnerability management prioritization pipeline."],
  ["sc2", "as3", "SBOM generation is integrated into DevSecOps pipelines — build-time dependency analysis."],
  ["sc2", "gv3", "Supply chain security policies define SBOM requirements, approved sources, and provenance standards."],
  ["sc2", "rm1", "Supply chain risk must be quantified — compromised dependencies can have outsized blast radius."],
  ["sc2", "ai4", "AI model supply chains need the same rigor — pre-trained models and training datasets."],

  // ===== SC3: Concentration & 4th Party =====
  ["sc5", "sc1", "Fourth-party analysis extends TPRM — solid Tier 1 assessments are prerequisite."],
  ["sc5", "be5", "Concentration risk directly threatens resilience — single vendor failure can cascade."],
  ["sc5", "be1", "Cloud provider concentration is a critical risk — multi-cloud strategy mitigates it."],
  ["sc5", "rm1", "Concentration risk must be in the risk register with scenario analysis."],
  ["sc5", "sa5", "Resilient design must account for vendor concentration — architecture should support vendor failover."],

  // ===== SC4: Vendor Transparency =====
  ["sc7", "gv5", "Vendor transparency is a direct manifestation of trust-as-corporate-value commitment."],
  ["sc7", "sc1", "Published vendor standards require TPRM data — can't report on what hasn't been assessed."],
  ["sc7", "dp1", "Data flow disclosures require data governance — understanding what data goes where."],
  ["sc7", "dp4", "Subprocessor lists and data flow disclosures must include cross-border transfer information."],
  ["sc7", "rm2", "Transparency reporting often responds to customer compliance requirements — SOC 2, HIPAA, etc."],

  // ===== SC5: Supply Chain Incidents =====
  ["sc8", "ir1", "Supply chain IR uses the same playbook infrastructure and forensic capabilities."],
  ["sc8", "sc2", "Responding to supply chain incidents requires knowing which components are affected (SBOM)."],
  ["sc8", "sc1", "Vendor notification and coordination during incidents depends on established TPRM relationships."],
  ["sc8", "ir4", "Supply chain incidents require stakeholder communication — customers need to know if they're affected."],
  ["sc8", "so3", "Detection of supply chain compromises often comes through SOC anomaly detection."],
  ["sc8", "so2", "Emergency vulnerability patching for supply chain incidents goes through vuln management."],

  // ===== DP1: Data Governance & Classification =====
  ["dp1", "rm3", "Data governance is jointly owned with legal — discovery, ownership, and retention are legal obligations."],
  ["dp1", "gv3", "Data classification and handling policies are part of the broader policy framework."],
  ["dp1", "rm2", "Compliance audits require evidence of data governance — classification, lineage, and retention."],
  ["dp1", "ia1", "Data access controls are implemented through identity lifecycle — role-based data access."],
  ["dp1", "gv2", "Frameworks define data governance requirements — NIST, HIPAA, PCI all mandate data controls."],
  ["dp1", "tm1", "Data handling training ensures employees know how to classify and protect information."],

  // ===== DP2: Privacy Engineering =====
  ["dp2", "dp1", "Privacy engineering can't minimize data without knowing what exists and how it's classified."],
  ["dp2", "sa4", "Privacy-by-design must be in the SDLC — PIAs happen during design."],
  ["dp2", "gv3", "Privacy policies define data minimization rules, purpose limitation, and retention requirements."],
  ["dp2", "so1", "DLP integration enforces privacy engineering requirements at the network and endpoint level."],
  ["dp2", "rm2", "Privacy engineering controls are audited under GDPR, CCPA, HIPAA."],
  ["dp2", "ai4", "AI training data with PII needs privacy controls — anonymization, differential privacy."],
  ["dp2", "as1", "Developers must implement privacy controls in code — encryption, tokenization, data handling."],

  // ===== DP3: Consent & Rights Management =====
  ["dp3", "dp1", "Can't fulfill deletion requests without knowing where data lives — data governance is prerequisite."],
  ["dp3", "rm2", "DSR fulfillment timelines are defined by compliance requirements (CCPA 45 days, GDPR 30 days)."],
  ["dp3", "ia1", "Rights management depends on identity — verifying DSR requestors requires identity validation."],
  ["dp3", "rm3", "Legal counsel guides DSR response process and reviews edge cases."],
  ["dp3", "gv3", "Consent management policies define what consent is collected, how, and preference center design."],
  ["dp3", "be1", "Cloud and SaaS platforms must support DSR fulfillment — can you delete data from your SaaS vendors?"],
  ["dp3", "sc1", "Vendor DPAs must include DSR obligations — if vendors hold customer data, they must support deletion."],

  // ===== DP4: Cross-Border Data Flows =====
  ["dp4", "rm2", "Transfer decisions are driven by regulatory compliance — GDPR, Schrems II, country-specific laws."],
  ["dp4", "rm3", "Transfer impact assessments require legal analysis of destination country regimes."],
  ["dp4", "dp1", "Data flow mapping depends on knowing what data exists and where it moves — data governance."],
  ["dp4", "sc1", "Vendor data processing in other jurisdictions triggers cross-border obligations."],
  ["dp4", "be1", "Cloud region selection is a cross-border data flow decision — where does data reside?"],
  ["dp4", "gv3", "Data residency and sovereignty policies define where data can and cannot flow."],

  // ===== DP5: Data Ethics =====
  ["dp5", "ai2", "Data ethics and responsible AI are symbiotic — ethical data enables trustworthy AI."],
  ["dp5", "gv5", "Data ethics is a core trust pillar — it defines how the organization treats people's data."],
  ["dp5", "dp1", "Ethical data use requires knowing what data you have and how it was collected."],
  ["dp5", "gv3", "Ethics principles must be codified in policy to be enforceable."],
  ["dp5", "ai1", "AI governance must incorporate data ethics — AI systems are major consumers of personal data."],
  ["dp5", "gv1", "Data ethics must be a strategic commitment, not just a policy checkbox."],

  // ===== AS1: Secure Development =====
  ["as1", "tm5", "Secure coding requires trained developers — skills development feeds code quality."],
  ["as1", "tm1", "Security culture determines whether developers embrace security or treat it as bureaucracy."],
  ["as1", "gv3", "Coding standards and security requirements are defined in organizational policy."],
  ["as1", "gv2", "Framework controls specify secure development requirements — NIST, CMMC, PCI-DSS."],
  ["as1", "dp2", "Developers must implement privacy controls — encryption, tokenization, and data handling in code."],
  ["as1", "sa4", "Secure development practices are integrated into the SDLC process."],

  // ===== AS2: DevSecOps Pipeline =====
  ["as3", "as1", "DevSecOps automates secure development practices — the pipeline encodes the standards."],
  ["as3", "so5", "DevSecOps leverages shared automation capabilities — CI/CD security shares infrastructure with SOAR."],
  ["as3", "sc2", "SBOM generation and SCA are integrated into the build pipeline."],
  ["as3", "gv3", "Pipeline security requirements and gate criteria are defined in policy."],
  ["as3", "tm5", "Building and maintaining DevSecOps pipelines requires DevOps and security engineering skills."],
  ["as3", "sa3", "Cloud-native CI/CD pipelines need cloud security architecture alignment."],
  ["as3", "ai4", "ML pipeline security (model training, data ingestion) must be integrated into DevSecOps."],

  // ===== AS3: API Security =====
  ["as5", "ia4", "API authentication and secrets management are PAM functions."],
  ["as5", "so2", "API vulnerabilities must be tracked through vulnerability management."],
  ["as5", "sa4", "API threat modeling is part of the Secure SDLC process."],
  ["as5", "so3", "API abuse detection feeds into SOC correlation — anomalous call patterns, credential stuffing."],
  ["as5", "gv3", "API security standards define authentication requirements, rate limits, and data exposure rules."],
  ["as5", "dp2", "APIs handling PII must implement privacy engineering controls — data minimization in responses."],
  ["as5", "as3", "API security testing is integrated into the DevSecOps pipeline."],

  // ===== AS4: Web Application Defense =====
  ["as6", "so1", "WAF and DDoS protection are threat prevention controls at the application layer."],
  ["as6", "so3", "Web application attack logs feed SOC detection and correlation."],
  ["as6", "so2", "Application vulnerability testing findings flow into vulnerability management."],
  ["as6", "sa2", "WAF is a defense-in-depth layer — application-level protection complements network controls."],
  ["as6", "gv3", "WAF rules and blocking policies must align with organizational security standards."],
  ["as6", "tm3", "WAF tuning and management require dedicated, skilled staff."],

  // ===== AS5: Open Source & SCA =====
  ["as9", "sc2", "SCA is the technical foundation for software supply chain visibility and SBOM generation."],
  ["as9", "rm3", "Open-source license compliance is a legal obligation managed through data governance."],
  ["as9", "as3", "SCA is integrated into DevSecOps pipelines — build-time dependency analysis."],
  ["as9", "so2", "SCA findings feed the vulnerability management pipeline."],
  ["as9", "gv3", "Policies define approved open-source components, license types, and exception criteria."],

  // ===== BE1: Cloud Strategy =====
  ["be1", "sa3", "Cloud strategy execution depends on the right cloud security architecture."],
  ["be1", "rm1", "Cloud adoption decisions must be risk-informed — each service adds risk."],
  ["be1", "sc1", "Cloud vendors are third parties requiring TPRM assessment."],
  ["be1", "ia3", "Multi-cloud requires federated identity — SSO across cloud environments."],
  ["be1", "gv1", "Cloud strategy must align with overall security and business strategy."],
  ["be1", "gv3", "Cloud policies define acceptable services, data residency, and configuration standards."],
  ["be1", "dp4", "Cloud region selection is a cross-border data flow decision."],
  ["be1", "tm4", "Cloud security tooling, training, and migration costs are budget items."],

  // ===== BE2: M&A Security =====
  ["be2", "ia1", "Merging user directories is a day-one critical activity in any acquisition."],
  ["be2", "rm1", "Pre-acquisition risk assessment evaluates the target's security posture."],
  ["be2", "so2", "Acquisition targets need vulnerability assessment before network integration."],
  ["be2", "gv3", "M&A security policies define assessment requirements and integration standards."],
  ["be2", "sa3", "Cloud environment integration requires architecture alignment and security review."],
  ["be2", "tm4", "M&A security integration costs (tooling, staff, remediation) must be budgeted."],
  ["be2", "sc1", "Acquired company's vendor relationships become your third-party risk."],

  // ===== BE3: IoT & Emerging Tech =====
  ["be3", "rm4", "IoT proliferation directly expands the OT/physical security risk surface."],
  ["be3", "tm5", "Emerging tech requires new skills — IoT protocols, edge computing, quantum."],
  ["be3", "ia5", "IoT device identity and attestation is a zero trust challenge."],
  ["be3", "so2", "IoT firmware vulnerabilities need specialized scanning and management."],
  ["be3", "sa2", "IoT devices need network segmentation to contain their risk."],
  ["be3", "gv3", "IoT security policies define device approval, patching requirements, and network placement."],
  ["be3", "sc1", "IoT vendors require TPRM assessment — hardware supply chain risk."],

  // ===== BE4: Mobile & Remote Work =====
  ["be4", "ia5", "Remote access is a zero trust identity problem — context-aware access decisions."],
  ["be4", "sa1", "SASE/SSE provides the architecture for secure remote access."],
  ["be4", "ia2", "Remote work requires robust MFA — even more critical on unmanaged devices."],
  ["be4", "so1", "Endpoint security must extend to home networks and personal devices."],
  ["be4", "gv3", "BYOD and remote work policies define acceptable use, device requirements, and security controls."],
  ["be4", "dp2", "Remote access to PII requires privacy controls — encryption, access logging, and DLP."],
  ["be4", "tm1", "Remote workers need security awareness training adapted for home environments."],

  // ===== BE5: Agility & Resilience =====
  ["be5", "sa5", "Resilience depends on architecture — resilient design is the technical foundation."],
  ["be5", "ir2", "Ransomware resilience is a critical component of overall business continuity."],
  ["be5", "gv1", "Resilience priorities are set at the strategic level — leadership defines acceptable downtime."],
  ["be5", "rm1", "BIA and risk assessment determine which systems need what recovery time objectives."],
  ["be5", "sc5", "Vendor concentration risk threatens resilience — single points of failure."],
  ["be5", "ir1", "IR capability directly impacts resilience — faster response means faster recovery."],
  ["be5", "tm4", "BC/DR infrastructure and testing programs are budget-managed items."],

  // ===== TM1: Security Culture =====
  ["tm1", "gv5", "Culture must embody trust values — awareness training should reinforce transparency."],
  ["tm1", "gv3", "Training content is derived from policies — culture programs operationalize policy."],
  ["tm1", "gv1", "Culture programs must align with strategic vision — what behaviors does leadership want to reinforce?"],
  ["tm1", "tm4", "Training programs, platforms, and phishing simulations are budget items."],
  ["tm1", "tm3", "Culture initiatives need champions — engaged staff who model security behavior."],
  ["tm1", "tm6", "Trust culture and security culture are mutually reinforcing — you need both."],

  // ===== TM2: Talent & Retention =====
  ["tm3", "tm4", "Hiring, compensation, and retention costs are directly constrained by budget."],
  ["tm3", "tm5", "Retention depends on growth — skills development is a key retention lever."],
  ["tm3", "gv1", "Staffing plan must align with strategy — the roadmap determines what skills are needed."],
  ["tm3", "tm6", "Trust culture creates psychological safety that retains talent — toxic cultures lose people."],

  // ===== TM3: Budget & Program Mgmt =====
  ["tm4", "gv1", "Budget allocation reflects strategic priorities — strategy determines where money flows."],
  ["tm4", "gv4", "Budget justification requires metrics demonstrating program value and risk reduction."],
  ["tm4", "rm1", "Risk quantification justifies budget — CRQ translates security investment into financial terms."],

  // ===== TM4: Skills Development =====
  ["tm5", "ai6", "AI-enabled security tools create new skill requirements for operating and tuning ML models."],
  ["tm5", "gv1", "Skills roadmap must align with security strategy — train for where the program is going."],
  ["tm5", "tm4", "Training, certifications, and development programs are budget items."],
  ["tm5", "rm4", "OT security requires specialized training — industrial protocols and safety-critical systems."],
  ["tm5", "tm3", "Skills development supports retention — people stay where they grow."],

  // ===== TM5: Trust Culture =====
  ["tm6", "gv5", "Internal trust culture is the operational expression of external trust commitments."],
  ["tm6", "ir6", "Blameless postmortems only happen with trust — psychological safety enables transparency."],
  ["tm6", "tm1", "Trust culture builds on security culture — transparency requires people who care about security."],
  ["tm6", "gv1", "Trust must be a strategic value, modeled by leadership and reinforced in every decision."],
  ["tm6", "gv3", "Trust practices must be codified in policy — reporting protections, blameless investigation standards."],
];

// ========== BUILD LOOKUP MAPS ==========
function buildDepMaps(edges) {
  const dependsOn = {};
  const dependedBy = {};
  edges.forEach(([src, tgt, reason]) => {
    if (!dependsOn[src]) dependsOn[src] = [];
    if (!dependedBy[tgt]) dependedBy[tgt] = [];
    dependsOn[src].push({ target: tgt, reason });
    dependedBy[tgt].push({ source: src, reason });
  });
  return { dependsOn, dependedBy };
}
const { dependsOn: DEP_ON, dependedBy: DEP_BY } = buildDepMaps(DEP_EDGES);
const childToBranch = {};
const childLabelMap = {};
const branchLabelMap = {};
const branchColorMap = {};
FRAMEWORK.children.forEach((b) => {
  branchLabelMap[b.id] = b.label.replace(/\n/g, " ");
  branchColorMap[b.id] = b.color;
  b.children.forEach((c) => { childToBranch[c.id] = b.id; childLabelMap[c.id] = c.label; });
});

// ========== GRC STANDARDS MAPPING ==========
const STD_COLORS = {
  "NIST 800-53": "#60A5FA",
  "NIST 800-171": "#818CF8",
  "NIST 800-161": "#A78BFA",
  "NIST CSF 2.0": "#7DD3FC",
  "NIST AI RMF": "#FCD34D",
  "HIPAA": "#34D399",
  "PCI DSS 4.0": "#FBBF24",
  "DORA": "#FB923C",
  "GDPR": "#F472B6",
  "CCPA/CPRA": "#E879F9",
  "SOC 2": "#4ADE80",
  "ISO 27001": "#2DD4BF",
  "ISO 42001": "#F9A8D4",
  "CMMC 2.0": "#F87171",
  "NIST 800-82": "#C4B5FD",
  "NIST 800-183": "#BAE6FD",
  "NIST 800-207": "#93C5FD",
};

const STANDARDS_MAP = {
  // ===== Security Operations =====
  so1: [
    { std: "NIST 800-53", ref: "SC-7, SC-8, SI-3, SI-4, SI-8, SC-12, SC-13", note: "Boundary protection, transmission integrity, malware protection, system monitoring, spam protection, cryptographic key management, and cryptographic protection." },
    { std: "NIST 800-171", ref: "3.13.1, 3.13.6, 3.13.8, 3.14.2, 3.14.6", note: "Boundary protection, network communications by exception, CUI in transit, malicious code protection, and monitoring for attacks." },
    { std: "HIPAA", ref: "§164.312(a)(1), §164.312(e)(1)", note: "Access controls to ePHI and transmission security — encryption and integrity controls." },
    { std: "PCI DSS 4.0", ref: "Req 1, 4, 5", note: "Network security controls, protect cardholder data in transit, and protect from malicious software." },
    { std: "DORA", ref: "Art. 9(1)-(2)", note: "Protection and prevention measures including network security, encryption, and data leakage prevention." },
    { std: "NIST CSF 2.0", ref: "PR.DS, PR.PS, PR.IR", note: "Data security, platform security, and technology infrastructure resilience protections." },
  ],
  so2: [
    { std: "NIST 800-53", ref: "RA-5, SI-2, CM-6, CM-8", note: "Vulnerability monitoring and scanning, flaw remediation, configuration settings, and system component inventory." },
    { std: "NIST 800-171", ref: "3.11.2, 3.11.3, 3.14.1", note: "Scan for vulnerabilities, remediate vulnerabilities, and flaw remediation." },
    { std: "HIPAA", ref: "§164.308(a)(1)(ii)(A-B)", note: "Risk analysis and risk management — identifying and addressing vulnerabilities to ePHI." },
    { std: "PCI DSS 4.0", ref: "Req 6.3, 11.3", note: "Security vulnerabilities identified and addressed, and external/internal vuln scanning." },
    { std: "DORA", ref: "Art. 8(5), Art. 24", note: "Identification of ICT vulnerabilities and threat-led penetration testing (TLPT)." },
    { std: "NIST CSF 2.0", ref: "ID.RA-01, PR.PS-02", note: "Asset vulnerability identification and software maintenance/replacement." },
  ],
  so3: [
    { std: "NIST 800-53", ref: "SI-4, AU-6, IR-4, AU-12, AU-2", note: "Information system monitoring, audit record review/analysis/reporting, incident handling, and audit generation." },
    { std: "NIST 800-171", ref: "3.3.1, 3.3.5, 3.14.6, 3.14.7", note: "System-level auditing, audit review/analysis/reporting, monitor for attacks and unauthorized connections." },
    { std: "HIPAA", ref: "§164.312(b), §164.308(a)(1)(ii)(D), §164.308(a)(5)(ii)(C)", note: "Audit controls, information system activity review, and log-in monitoring." },
    { std: "PCI DSS 4.0", ref: "Req 10, 11.5", note: "Log and monitor all access to system components and cardholder data, and network intrusion detection." },
    { std: "DORA", ref: "Art. 10(1)-(2)", note: "Detection of anomalous activities including network performance issues and ICT-related incidents." },
    { std: "NIST CSF 2.0", ref: "DE.CM, DE.AE", note: "Continuous monitoring and adverse event analysis." },
  ],
  so4: [
    { std: "NIST 800-53", ref: "CA-8, RA-5, RA-6, PM-14", note: "Penetration testing, vulnerability monitoring, technical surveillance countermeasures, and insider threat program." },
    { std: "NIST 800-171", ref: "3.11.2, 3.12.1", note: "Vulnerability scanning covering organizational systems and security control assessments." },
    { std: "PCI DSS 4.0", ref: "Req 11.4, 11.5", note: "External and internal penetration testing performed regularly and network intrusions detected/responded to." },
    { std: "DORA", ref: "Art. 24-27", note: "Threat-led penetration testing (TLPT) requirements for critical financial entities." },
    { std: "HIPAA", ref: "§164.308(a)(8)", note: "Evaluation — periodic technical and nontechnical security assessments." },
    { std: "NIST CSF 2.0", ref: "ID.RA-04", note: "Potential impacts and likelihoods of threats exploiting vulnerabilities." },
  ],
  so5: [
    { std: "NIST 800-53", ref: "SI-4, IR-4(1), SI-2(2), RA-5(2)", note: "Automated monitoring tools, automated incident handling, automated flaw remediation status, and automated vulnerability scanning updates." },
    { std: "PCI DSS 4.0", ref: "Req 6.3.3, 10.4.1, 11.3.1", note: "Automated updating of system software, automated audit log review, and automated vulnerability scanning." },
    { std: "DORA", ref: "Art. 9(1)", note: "Use of ICT tools to minimize impact of risks through automated deployment of security measures." },
    { std: "NIST CSF 2.0", ref: "RS.MA, DE.CM", note: "Incident management automation and continuous monitoring." },
  ],

  // ===== Incident Response =====
  ir1: [
    { std: "NIST 800-53", ref: "IR-1 thru IR-8, IR-10", note: "Complete IR family — policy, planning, training, testing, handling, monitoring, reporting, and integrated information security analysis." },
    { std: "NIST 800-171", ref: "3.6.1, 3.6.2, 3.6.3", note: "Establish IR capability, track/document/report incidents, and test IR capability." },
    { std: "HIPAA", ref: "§164.308(a)(6)", note: "Security incident procedures — identify and respond to suspected or known security incidents." },
    { std: "PCI DSS 4.0", ref: "Req 12.10", note: "Incident response plan created, maintained, tested, and personnel trained." },
    { std: "DORA", ref: "Art. 11, Art. 17", note: "ICT-related incident response and recovery, and major ICT-related incident management framework." },
    { std: "NIST CSF 2.0", ref: "RS.MA, RS.AN, RS.MI", note: "Incident management, incident analysis, and incident mitigation." },
  ],
  ir2: [
    { std: "NIST 800-53", ref: "CP-2, CP-9, CP-10, IR-4, SI-3", note: "Contingency plan, system backup, system recovery/reconstitution, incident handling, and malware protection." },
    { std: "NIST 800-171", ref: "3.6.1, 3.8.9, 3.14.2", note: "Incident response operations, system backup, and malicious code protection." },
    { std: "HIPAA", ref: "§164.308(a)(7), §164.310(d)(2)(iv)", note: "Contingency plan — data backup, disaster recovery, emergency mode, and testing." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.2", note: "Incident response plan reviewed and updated based on lessons learned and industry developments." },
    { std: "DORA", ref: "Art. 11(1)-(6), Art. 12", note: "Business continuity policy including backup and recovery, restoration, and ICT business continuity testing." },
    { std: "NIST CSF 2.0", ref: "RC.RP, PR.DS-11", note: "Incident recovery plan execution and data backup maintenance." },
  ],
  ir4: [
    { std: "NIST 800-53", ref: "IR-6, IR-7, IR-10", note: "Incident reporting, IR assistance (coordinated response), and integrated information security analysis team." },
    { std: "DORA", ref: "Art. 19, Art. 20", note: "Reporting of major ICT-related incidents to competent authorities and content/timelines for reporting." },
    { std: "GDPR", ref: "Art. 33, Art. 34", note: "Notification of personal data breach to supervisory authority (72hr) and communication to data subjects." },
    { std: "HIPAA", ref: "§164.308(a)(6)(ii), §164.404", note: "Incident response/reporting and notification to individuals of breach of unsecured PHI." },
    { std: "NIST CSF 2.0", ref: "RS.CO", note: "Incident response reporting and communication." },
  ],
  ir5: [
    { std: "HIPAA", ref: "§164.404-408", note: "Individual notification, media notification, notification to HHS Secretary for breaches affecting 500+." },
    { std: "GDPR", ref: "Art. 33, Art. 34", note: "72-hour supervisory authority notification and data subject communication for high-risk breaches." },
    { std: "DORA", ref: "Art. 19(1)-(4)", note: "Initial, intermediate, and final reports to competent authorities on major ICT incidents." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.5", note: "Include alerts from security monitoring systems and incident response procedures for card brand notification." },
    { std: "CCPA/CPRA", ref: "§1798.150", note: "Data breach notification obligations and private right of action for unauthorized access to personal information." },
    { std: "NIST 800-53", ref: "IR-6, SI-5", note: "Incident reporting to designated authorities and security alerts/advisories." },
  ],
  ir6: [
    { std: "NIST 800-53", ref: "IR-4(4), IR-6, CP-4(2)", note: "Information correlation of incident info, incident reporting including lessons learned, and contingency plan training drills." },
    { std: "DORA", ref: "Art. 13", note: "Learning and evolving — post-incident reviews to identify improvements and update ICT risk framework." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.2", note: "Review and update IR plan at least annually and after significant incidents." },
    { std: "NIST CSF 2.0", ref: "RC.RP-06, ID.IM", note: "Post-recovery communication of changes and improvement activities driven by lessons learned." },
  ],

  // ===== Identity & Access Management =====
  ia1: [
    { std: "NIST 800-53", ref: "AC-2, IA-4, IA-5, PS-4, PS-5", note: "Account management, identifier management, authenticator management, personnel termination, and personnel transfer." },
    { std: "NIST 800-171", ref: "3.1.1, 3.5.1, 3.5.2, 3.9.2", note: "Limit system access, identify system users/processes, authenticate identities, and actions during personnel termination." },
    { std: "HIPAA", ref: "§164.312(a)(2)(i), §164.308(a)(3)(ii)(A-B), §164.308(a)(4)(ii)(B-C)", note: "Unique user IDs, workforce clearance, termination procedures, and access authorization/establishment." },
    { std: "PCI DSS 4.0", ref: "Req 7, 8.2, 8.6", note: "Restrict access by business need-to-know, user identification, and application/system account management." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Identity management including strong authentication, access right policies, and access revocation." },
    { std: "NIST CSF 2.0", ref: "PR.AA-01, PR.AA-03, PR.AA-05", note: "Identity management, user/device authentication, and access permissions management." },
  ],
  ia2: [
    { std: "NIST 800-53", ref: "IA-2, IA-5, IA-6, IA-8, IA-11", note: "User identification/authentication (incl. MFA enhancements), authenticator management, feedback obscuring, non-org users, and re-authentication." },
    { std: "NIST 800-171", ref: "3.5.3, 3.5.7, 3.5.8", note: "Multi-factor authentication for network and local access to privileged and non-privileged accounts." },
    { std: "HIPAA", ref: "§164.312(d)", note: "Person or entity authentication — verify identity of person or entity seeking access to ePHI." },
    { std: "PCI DSS 4.0", ref: "Req 8.3, 8.4, 8.5", note: "Strong authentication for users, MFA for all access into the CDE, and MFA system configuration." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Strong authentication mechanisms and control measures to protect authentication credentials." },
    { std: "GDPR", ref: "Art. 32(1)(b)", note: "Ability to ensure confidentiality of processing systems — authentication as a technical measure." },
  ],
  ia3: [
    { std: "NIST 800-53", ref: "IA-2(6), IA-8, AC-2(7)", note: "Network access to privileged accounts with federation, identification of non-organizational users, and role-based access schemes." },
    { std: "PCI DSS 4.0", ref: "Req 8.3.10", note: "Service provider multi-factor authentication for remote access and customer-facing SSO." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Access management policies including federated identity across ICT third-party service providers." },
    { std: "NIST CSF 2.0", ref: "PR.AA-02", note: "Identities are proofed and bound to credentials based on context." },
  ],
  ia4: [
    { std: "NIST 800-53", ref: "AC-2(7), AC-6(7), AC-17, IA-2(1-2)", note: "Privileged account role-based schemes, review of user privileges, remote access, and MFA for privileged network/local access." },
    { std: "NIST 800-171", ref: "3.1.5, 3.1.6, 3.1.7, 3.5.3", note: "Least privilege, restrict privileged access, prevent non-privileged functions during privileged sessions, and MFA for privileged accounts." },
    { std: "HIPAA", ref: "§164.312(a)(2)(iv), §164.312(a)(1)", note: "Emergency access procedure and access control mechanisms for information systems maintaining ePHI." },
    { std: "PCI DSS 4.0", ref: "Req 7.2, 8.6", note: "Access control model for system components and application/system account management including service accounts." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Policies to limit physical and logical access to ICT systems — privileged access rights strictly controlled." },
    { std: "NIST CSF 2.0", ref: "PR.AA-05, PR.AA-06", note: "Access permissions managed and provisioned, physical access managed." },
  ],
  ia5: [
    { std: "NIST 800-53", ref: "AC-4, SC-7, AC-2, IA-2, IA-11", note: "Information flow enforcement, boundary protection, account management, identification/authentication, and re-authentication." },
    { std: "NIST 800-171", ref: "3.1.3, 3.5.3, 3.13.1", note: "Control CUI flow, multi-factor authentication, and monitor/control communications at system boundaries." },
    { std: "DORA", ref: "Art. 9(2)", note: "Detect anomalous activities through network performance monitoring and continuous verification of access." },
    { std: "NIST CSF 2.0", ref: "PR.AA-01 thru PR.AA-06", note: "Full identity/access management suite including continuous verification and context-aware access." },
  ],

  // ===== Governance & Strategy =====
  gv1: [
    { std: "NIST 800-53", ref: "PM-1, PM-9, PM-11, PL-1, PL-2", note: "Information security program plan, risk management strategy, mission/business process definition, and system security plans." },
    { std: "NIST CSF 2.0", ref: "GV.OC, GV.RM, GV.SC", note: "Organizational context, risk management strategy, and cybersecurity supply chain risk management strategy." },
    { std: "DORA", ref: "Art. 5, Art. 6(8)", note: "ICT risk management framework with strategies, policies, and protocols — management body defines and approves." },
    { std: "HIPAA", ref: "§164.308(a)(1)(i)", note: "Security management process — implement policies and procedures to manage risk." },
    { std: "PCI DSS 4.0", ref: "Req 12.1", note: "Comprehensive information security policy established, published, maintained, and disseminated." },
  ],
  gv2: [
    { std: "NIST 800-53", ref: "PL-2, PL-8, PM-1", note: "System security plans, security architectures, and information security program plan referencing control frameworks." },
    { std: "NIST CSF 2.0", ref: "GV.RM-01, GV.RM-02", note: "Risk management objectives and risk appetite established and communicated." },
    { std: "DORA", ref: "Art. 6(1)-(5)", note: "ICT risk management framework as part of overall risk management framework with recognized standards." },
    { std: "HIPAA", ref: "§164.306", note: "Security standards general rules — flexibility of approach allowing selection of appropriate frameworks." },
  ],
  gv3: [
    { std: "NIST 800-53", ref: "All -1 controls (AC-1, AU-1, etc.), PM-2", note: "Policy and procedures for every control family, and senior information security officer designation." },
    { std: "NIST 800-171", ref: "3.1.1, 3.1.2, NFO controls", note: "Policies and RACI for limiting system access and controlling CUI." },
    { std: "HIPAA", ref: "§164.316(a)-(b)", note: "Policies and procedures must be maintained in written form, and documentation requirements." },
    { std: "PCI DSS 4.0", ref: "Req 12.1, 12.3, 12.4", note: "Information security policy, formal review, and management accountability for cardholder data protection." },
    { std: "DORA", ref: "Art. 5(1)-(2)", note: "Internal governance and control framework ensuring effective ICT risk management." },
    { std: "NIST CSF 2.0", ref: "GV.PO, GV.RR", note: "Policy for managing cybersecurity risks and roles/responsibilities for cybersecurity." },
  ],
  gv4: [
    { std: "NIST 800-53", ref: "PM-6, CA-7, PM-14", note: "Measures of performance, continuous monitoring, and testing/training/monitoring." },
    { std: "NIST CSF 2.0", ref: "ID.IM-01 thru ID.IM-04", note: "Improvement — lessons learned and current/previous results used to inform ongoing activities." },
    { std: "DORA", ref: "Art. 5(6), Art. 13(5)", note: "Management body reporting on ICT risk management framework and reviewing ICT risk post-incident." },
    { std: "PCI DSS 4.0", ref: "Req 12.4", note: "PCI DSS compliance is managed including responsibility assignments and periodic reviews." },
    { std: "HIPAA", ref: "§164.308(a)(8)", note: "Evaluation — periodic technical and nontechnical evaluations." },
  ],
  gv5: [
    { std: "NIST CSF 2.0", ref: "GV.OC-03", note: "Legal, regulatory, and contractual requirements regarding cybersecurity are understood and managed — trust is a governance function." },
    { std: "GDPR", ref: "Art. 5(2), Art. 24(1)", note: "Accountability principle — the controller is responsible for and must be able to demonstrate compliance." },
    { std: "DORA", ref: "Art. 5(4)", note: "Management body ensuring appropriate allocation of ICT investments and transparent reporting." },
  ],

  // ===== Risk Management & Compliance =====
  rm1: [
    { std: "NIST 800-53", ref: "RA-1 thru RA-9, PM-9", note: "Full risk assessment family — categorization, assessment, response, monitoring, and risk management strategy." },
    { std: "NIST 800-171", ref: "3.11.1, 3.11.2, 3.11.3", note: "Periodically assess risk, scan for vulnerabilities, and remediate vulnerabilities." },
    { std: "HIPAA", ref: "§164.308(a)(1)(ii)(A-B)", note: "Risk analysis — accurate and thorough assessment of potential risks to ePHI." },
    { std: "PCI DSS 4.0", ref: "Req 12.3.1, 12.3.2", note: "Targeted risk analysis and customized approach risk analysis." },
    { std: "DORA", ref: "Art. 6, Art. 8", note: "ICT risk management framework and identification of ICT risks." },
    { std: "NIST CSF 2.0", ref: "ID.RA, GV.RM", note: "Risk assessment and risk management strategy." },
  ],
  rm2: [
    { std: "NIST 800-53", ref: "CA-2, CA-5, CA-6, CA-7, AU-6", note: "Control assessments, plan of action and milestones, authorization, continuous monitoring, and audit review." },
    { std: "NIST 800-171", ref: "3.12.1, 3.12.2, 3.12.3", note: "Assess security controls, develop/implement plans of action, and monitor security controls." },
    { std: "HIPAA", ref: "§164.308(a)(8), §164.316", note: "Evaluation and documentation — periodic assessments and maintaining required records." },
    { std: "PCI DSS 4.0", ref: "Req 12.4, 12.5", note: "Manage PCI DSS compliance and document PCI DSS scope." },
    { std: "DORA", ref: "Art. 5(9)-(10)", note: "Internal audit of ICT risk management including frequency based on risk." },
  ],
  rm3: [
    { std: "NIST 800-53", ref: "MP-1, MP-6, AU-11, SI-12", note: "Media protection policy, sanitization, audit record retention, and information management." },
    { std: "HIPAA", ref: "§164.530, §164.316(b)(2), §164.310(d)(2)", note: "Uses and disclosures, documentation retention (6 years), and device/media disposal." },
    { std: "PCI DSS 4.0", ref: "Req 3.1, 3.2, 9.4", note: "Processes for data retention/disposal, SAD not stored after auth, and media physically secured." },
    { std: "GDPR", ref: "Art. 5(1)(e), Art. 17, Art. 28", note: "Storage limitation, right to erasure, and processor obligations." },
    { std: "NIST CSF 2.0", ref: "GV.OC-03", note: "Legal, regulatory, and contractual requirements are understood and managed." },
  ],
  rm4: [
    { std: "NIST 800-53", ref: "PE-1 thru PE-20, PM-8", note: "Physical and environmental protection family — facilities, access, environmental controls, and critical infrastructure plan." },
    { std: "NIST 800-82", ref: "Multiple sections", note: "Guide to OT Security — ICS-specific security recommendations (referenced by 800-53)." },
    { std: "HIPAA", ref: "§164.310(a)-(d)", note: "Physical safeguards — facility access, workstation use/security, and device/media controls." },
    { std: "PCI DSS 4.0", ref: "Req 9", note: "Restrict physical access to cardholder data." },
    { std: "DORA", ref: "Art. 8(4)", note: "Identification of ICT-supported business functions and interdependencies including physical infrastructure." },
  ],
  rm5: [
    { std: "NIST CSF 2.0", ref: "GV.RM-03", note: "Risk management activities including risk transfer mechanisms are established." },
    { std: "DORA", ref: "Art. 6(8)(a)", note: "ICT risk management includes strategies for digital operational resilience — insurance is a recognized transfer tool." },
    { std: "HIPAA", ref: "§164.308(a)(1)(ii)(B)", note: "Risk management — implement security measures sufficient to reduce risks (insurance as risk transfer)." },
  ],

  // ===== Security Architecture =====
  sa1: [
    { std: "NIST 800-53", ref: "AC-4, SC-7, SC-7(21), AC-2", note: "Information flow enforcement, boundary protection (incl. micro-segmentation), and logical access partitioning." },
    { std: "NIST 800-207", ref: "Core ZTA tenets", note: "Zero Trust Architecture reference — per-session access, least privilege, and continuous verification." },
    { std: "NIST 800-171", ref: "3.13.1, 3.13.2, 3.1.3", note: "Monitor/control communications at boundaries, employ architectural designs for network segmentation, and control CUI flow." },
    { std: "PCI DSS 4.0", ref: "Req 1.2, 1.3, 1.4", note: "Network security controls configured/maintained, network access restricted, and trusted/untrusted network controls." },
    { std: "DORA", ref: "Art. 9(2)", note: "Network security management including segregation and segmentation of ICT systems." },
  ],
  sa2: [
    { std: "NIST 800-53", ref: "SC-7, SC-32, AC-4, SA-8", note: "Boundary protection, system partitioning, information flow enforcement, and security engineering principles." },
    { std: "NIST 800-171", ref: "3.13.1, 3.13.2, 3.13.6", note: "Boundary protection, architectural designs for segmentation, and deny-by-default network communications." },
    { std: "PCI DSS 4.0", ref: "Req 1", note: "Network security controls installed, configured, and maintained between trusted and untrusted networks." },
    { std: "DORA", ref: "Art. 9(2)", note: "Ensure resilience, continuity, and availability through defense-in-depth strategies." },
  ],
  sa3: [
    { std: "NIST 800-53", ref: "SA-9, SA-9(5), AC-20", note: "External system services, processing/storage/service location, and use of external systems." },
    { std: "NIST 800-171", ref: "3.1.20, 3.13.1", note: "External system connections and monitoring communications at system boundaries including cloud." },
    { std: "PCI DSS 4.0", ref: "Req 2.2, 12.8", note: "System components configured securely including cloud, and third-party service provider management." },
    { std: "DORA", ref: "Art. 28-30", note: "Key principles for ICT third-party risk management including cloud service providers." },
    { std: "HIPAA", ref: "§164.308(b)(1)", note: "Business associate contracts and arrangements — cloud providers handling ePHI." },
  ],
  sa4: [
    { std: "NIST 800-53", ref: "SA-3, SA-8, SA-10, SA-11, SA-15", note: "System development life cycle, security engineering principles, developer config mgmt, testing/evaluation, and development process." },
    { std: "NIST 800-171", ref: "3.13.2, 3.14.1", note: "Employ architectural designs to improve security and identify/correct system flaws." },
    { std: "PCI DSS 4.0", ref: "Req 6.1, 6.2, 6.5", note: "Secure development processes, bespoke software developed securely, and change management procedures." },
    { std: "DORA", ref: "Art. 8(2)", note: "ICT systems acquisition and development based on ICT risk management framework." },
    { std: "NIST CSF 2.0", ref: "PR.DS-08", note: "Integrity of software and hardware is managed across the lifecycle." },
  ],
  sa5: [
    { std: "NIST 800-53", ref: "CP-1 thru CP-13", note: "Contingency planning family — policy, plan, training, testing, backup, recovery, reconstitution, and alternate sites." },
    { std: "NIST 800-171", ref: "3.8.9", note: "Protect availability through system and data backup." },
    { std: "HIPAA", ref: "§164.308(a)(7)", note: "Contingency plan — data backup, disaster recovery, emergency mode, and testing/revision." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.2", note: "Incident response and recovery plans regularly tested." },
    { std: "DORA", ref: "Art. 11, Art. 12", note: "ICT response and recovery including backup policies, restoration, and redundant ICT capacities." },
    { std: "NIST CSF 2.0", ref: "RC.RP, PR.DS-11", note: "Recovery plan execution and data backups maintained, sufficient, and tested." },
  ],

  // ===== AI Governance & Responsible AI =====
  ai1: [
    { std: "NIST AI RMF", ref: "Govern 1-6, Map 1-5", note: "AI risk governance structure, risk management process, and AI system context mapping." },
    { std: "NIST 800-53", ref: "PM-1, PL-2, PL-8", note: "Information security program plan, system security plans, and security architecture applied to AI systems." },
    { std: "DORA", ref: "Art. 5, Art. 6", note: "ICT risk management framework — AI systems are ICT systems subject to governance requirements." },
    { std: "GDPR", ref: "Art. 22, Art. 35", note: "Automated individual decision-making (including profiling) and data protection impact assessment for AI." },
  ],
  ai2: [
    { std: "NIST AI RMF", ref: "Map 2-3, Measure 2, Manage 1-4", note: "AI system categorization for bias, AI risk measurement including fairness metrics, and risk management." },
    { std: "GDPR", ref: "Art. 22, Recital 71", note: "Right not to be subject to solely automated decisions, with safeguards against bias." },
    { std: "NIST 800-53", ref: "PM-25", note: "Minimizing personally identifiable information used in training, testing, and operating AI systems." },
    { std: "NIST CSF 2.0", ref: "GV.OC-03", note: "Legal and ethical requirements including AI fairness obligations." },
  ],
  ai3: [
    { std: "NIST 800-53", ref: "CM-8, PM-5, RA-9", note: "System component inventory, system inventory, and criticality analysis — applied to AI system discovery." },
    { std: "NIST AI RMF", ref: "Govern 1.1, Map 1", note: "AI system inventory and context establishment for managing AI risk." },
    { std: "DORA", ref: "Art. 8(1)", note: "Identification of all ICT-supported business functions and ICT assets including AI tools." },
  ],
  ai4: [
    { std: "NIST 800-53", ref: "SA-11, SI-3, SI-7, SA-8", note: "Developer testing for AI systems, malware protection (incl. adversarial ML), software integrity, and security engineering." },
    { std: "NIST AI RMF", ref: "Measure 2.6, Manage 2", note: "AI security testing and measurement of adversarial robustness." },
    { std: "NIST 800-161", ref: "SA-12, SR-3, SR-11", note: "Supply chain protection for AI model components, provenance, and component authenticity." },
    { std: "PCI DSS 4.0", ref: "Req 6.2, 6.3, 11.3", note: "Bespoke/custom software (incl. AI) developed securely, vulnerabilities identified, and testing." },
  ],
  ai5: [
    { std: "NIST AI RMF", ref: "Govern 1.4, Govern 6, Map 2.3", note: "Processes for human oversight of AI, mechanisms for feedback, and categorizing AI systems by autonomy level." },
    { std: "NIST 800-53", ref: "AC-3, AC-6, AU-12", note: "Access enforcement, least privilege, and audit generation — applied to autonomous AI agents." },
    { std: "GDPR", ref: "Art. 22(1)-(3)", note: "Right not to be subject to purely automated decision-making with legal effects — human oversight requirements." },
  ],
  ai6: [
    { std: "NIST AI RMF", ref: "Map 3, Measure 1-4", note: "AI benefits and costs identified, and AI risk measurement — applied to security-enhancing AI." },
    { std: "NIST 800-53", ref: "SI-4, IR-4, RA-5", note: "System monitoring, incident handling, and vulnerability scanning augmented by AI/ML." },
    { std: "DORA", ref: "Art. 10(1)", note: "Mechanisms to promptly detect anomalous activities — AI-enabled detection is an implementation approach." },
  ],

  // ===== Supply Chain Transparency =====
  sc1: [
    { std: "NIST 800-53", ref: "SR-1 thru SR-12, SA-9", note: "Supply chain risk management family — policy, controls, acquisition strategies, and external system services." },
    { std: "NIST 800-161", ref: "Full document", note: "Cybersecurity Supply Chain Risk Management (C-SCRM) — comprehensive TPRM framework." },
    { std: "NIST 800-171", ref: "3.1.20, 3.12.4", note: "Connections to external systems and system security plan coverage of third-party connections." },
    { std: "HIPAA", ref: "§164.308(b), §164.314(a)", note: "Business associate contracts and organizational requirements for subcontractors." },
    { std: "PCI DSS 4.0", ref: "Req 12.8, 12.9", note: "Third-party service provider relationships managed and acknowledged." },
    { std: "DORA", ref: "Art. 28-30", note: "Key principles and contractual arrangements for ICT third-party service providers." },
  ],
  sc2: [
    { std: "NIST 800-53", ref: "SR-4, SR-11, SA-10", note: "Provenance, component authenticity, and developer configuration management." },
    { std: "NIST 800-161", ref: "SA-12, SR-3, SR-4", note: "Supply chain protection, supply chain controls, and provenance verification." },
    { std: "PCI DSS 4.0", ref: "Req 6.3.2", note: "Inventory of bespoke and custom software and third-party components." },
    { std: "DORA", ref: "Art. 28(8)", note: "Monitoring of ICT third-party service providers including subcontracting chains." },
    { std: "NIST CSF 2.0", ref: "GV.SC-05", note: "Supply chain requirements established with suppliers and partners." },
  ],
  sc5: [
    { std: "NIST 800-53", ref: "SR-2, SR-3, RA-3(1)", note: "Supply chain risk management plan, supply chain controls, and supply chain risk assessment." },
    { std: "NIST 800-161", ref: "RA-3(1), SR-2, PM-30", note: "Supply chain risk assessment, risk management plan, and supply chain risk management strategy." },
    { std: "DORA", ref: "Art. 28(3), Art. 29(2)", note: "Concentration risk assessment and sub-outsourcing risk analysis." },
    { std: "NIST CSF 2.0", ref: "GV.SC-07", note: "Risks posed by suppliers and third-party partners understood and managed." },
  ],
  sc7: [
    { std: "GDPR", ref: "Art. 28(2)-(3), Art. 30", note: "Processor transparency requirements, subprocessor notification, and records of processing activities." },
    { std: "NIST CSF 2.0", ref: "GV.SC-06", note: "Due diligence conducted before entering formal supplier or third-party relationships." },
    { std: "DORA", ref: "Art. 28(3)(a)", note: "Assessment of concentration risk including sub-outsourcing to identify full dependency chain." },
    { std: "CCPA/CPRA", ref: "§1798.140(ag)", note: "Service provider definitions and requirements for transparency regarding data processing." },
  ],
  sc8: [
    { std: "NIST 800-53", ref: "IR-4, IR-6, SR-8", note: "Incident handling, reporting, and notification of supply chain compromises." },
    { std: "NIST 800-161", ref: "IR-4, IR-6, SR-8", note: "C-SCRM specific incident handling and supply chain compromise notification." },
    { std: "DORA", ref: "Art. 11(6)", note: "ICT business continuity plans accounting for risk of third-party ICT service provider disruption." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.5", note: "Include monitoring and responding to alerts from third-party security systems." },
  ],

  // ===== Data Practices & Privacy =====
  dp1: [
    { std: "NIST 800-53", ref: "RA-2, MP-1, MP-4, SC-28, CM-8", note: "Security categorization, media protection policy, media storage, protection of information at rest, and component inventory." },
    { std: "NIST 800-171", ref: "3.1.22, 3.8.1, 3.8.3, 3.8.4", note: "Control CUI posted publicly, protect system media, sanitize media, and mark media." },
    { std: "HIPAA", ref: "§164.312(a)(1), §164.530(c), §164.310(d)", note: "Access controls, safeguards for PHI, and device/media controls." },
    { std: "PCI DSS 4.0", ref: "Req 3", note: "Protect stored account data — data classification, retention, and disposal." },
    { std: "GDPR", ref: "Art. 5(1)(a)-(e), Art. 30", note: "Data processing principles (purpose limitation, minimization, accuracy, storage limitation) and records of processing." },
    { std: "CCPA/CPRA", ref: "§1798.100, §1798.130", note: "Consumer right to know categories of personal information collected, and disclosure requirements." },
  ],
  dp2: [
    { std: "GDPR", ref: "Art. 25, Art. 35, Art. 32", note: "Data protection by design and by default, DPIA, and security of processing." },
    { std: "NIST 800-53", ref: "PT-1 thru PT-8, SA-8", note: "PII processing and transparency family including privacy impact assessments, consent, and minimization." },
    { std: "HIPAA", ref: "§164.502(b), §164.514", note: "Minimum necessary standard and de-identification of PHI." },
    { std: "PCI DSS 4.0", ref: "Req 3.3, 3.4, 3.5", note: "SAD not stored after authorization, PAN display restricted, and PAN secured wherever stored." },
    { std: "CCPA/CPRA", ref: "§1798.100(c)", note: "Collection and use limited to what is reasonably necessary and proportionate." },
    { std: "NIST CSF 2.0", ref: "PR.DS-01, PR.DS-02", note: "Data-at-rest and data-in-transit protection." },
  ],
  dp3: [
    { std: "GDPR", ref: "Art. 6-7, Art. 15-21", note: "Lawful basis/consent requirements and full data subject rights (access, rectification, erasure, portability, objection)." },
    { std: "CCPA/CPRA", ref: "§1798.100-125", note: "Right to know, right to delete, right to opt-out of sale/sharing, and right to limit use of sensitive PI." },
    { std: "HIPAA", ref: "§164.522, §164.524, §164.526", note: "Right to request restrictions, right of access to PHI, and right to amend." },
    { std: "NIST 800-53", ref: "PT-3, PT-4, PT-5, PT-6", note: "PII processing purposes, consent, privacy notice, and system of records notice." },
  ],
  dp4: [
    { std: "GDPR", ref: "Art. 44-49, Art. 46", note: "Transfers to third countries — adequacy decisions, appropriate safeguards (SCCs, BCRs), and derogations." },
    { std: "NIST 800-53", ref: "PT-2, SA-9(5)", note: "Authority to process PII and processing/storage location restrictions." },
    { std: "DORA", ref: "Art. 28(3)", note: "Data location requirements for ICT third-party providers including geographic restrictions." },
    { std: "CCPA/CPRA", ref: "§1798.145(a)", note: "Compliance with other laws and regulations regarding cross-border data transfers." },
  ],
  dp5: [
    { std: "GDPR", ref: "Art. 5(1)(a), Recital 39", note: "Lawfulness, fairness, and transparency principle — ethical processing of personal data." },
    { std: "NIST AI RMF", ref: "Map 2, Govern 3", note: "Anticipated impacts considered (bias, fairness, equity) and workforce diversity and culture." },
    { std: "NIST 800-53", ref: "PT-1, PT-7, PT-8", note: "PII processing policy, specific categories of PII, and computer matching requirements." },
    { std: "NIST CSF 2.0", ref: "GV.OC-03", note: "Legal, regulatory, and ethical requirements including data use obligations." },
  ],

  // ===== Application Security =====
  as1: [
    { std: "NIST 800-53", ref: "SA-3, SA-8, SA-10, SA-11, SA-15, SA-16, SA-17", note: "SDLC, security engineering principles, developer config mgmt, testing, development process/standards, and trust." },
    { std: "NIST 800-171", ref: "3.14.1, 3.13.2", note: "Identify and correct system flaws, and employ architectural designs." },
    { std: "PCI DSS 4.0", ref: "Req 6.1, 6.2", note: "Processes to identify/manage security vulnerabilities and bespoke software developed securely." },
    { std: "DORA", ref: "Art. 8(2)", note: "ICT systems designed to be resilient and developed in accordance with risk management framework." },
    { std: "HIPAA", ref: "§164.312(a)(2)(iv)", note: "Encryption and decryption of ePHI — developers must implement required technical safeguards." },
  ],
  as3: [
    { std: "NIST 800-53", ref: "SA-10, SA-11, CM-3, CM-5, SI-7", note: "Developer config management, testing/evaluation, configuration change control, access restrictions for changes, and software integrity." },
    { std: "PCI DSS 4.0", ref: "Req 6.2, 6.5", note: "Bespoke/custom software developed securely and changes managed with proper controls." },
    { std: "NIST 800-171", ref: "3.4.3, 3.4.4, 3.4.5", note: "Track/review/approve changes, analyze security impact, and define/enforce physical/logical access restrictions." },
    { std: "DORA", ref: "Art. 8(2)", note: "Sound, comprehensive, and well-documented ICT systems acquisition, development, and maintenance." },
  ],
  as5: [
    { std: "NIST 800-53", ref: "SC-8, IA-3, IA-9, AC-4", note: "Transmission confidentiality/integrity, device identification/auth, service identification, and information flow enforcement." },
    { std: "PCI DSS 4.0", ref: "Req 6.2.3, 6.3", note: "Software code reviewed for vulnerabilities including API endpoints, and vulnerabilities addressed." },
    { std: "NIST 800-171", ref: "3.5.1, 3.13.8", note: "Identify system users, processes, and devices, and implement cryptographic mechanisms for CUI in transit (API comms)." },
  ],
  as6: [
    { std: "NIST 800-53", ref: "SC-7, SI-3, SI-4, SC-5", note: "Boundary protection (WAF), malware protection, system monitoring, and denial of service protection." },
    { std: "PCI DSS 4.0", ref: "Req 6.4", note: "Public-facing web applications are protected against attacks." },
    { std: "NIST 800-171", ref: "3.13.1, 3.14.2, 3.14.6", note: "Monitor communications at boundaries, protect against malicious code, and monitor for attacks." },
    { std: "DORA", ref: "Art. 9(1)", note: "ICT protection and prevention including against intrusions and data misuse." },
  ],
  as9: [
    { std: "NIST 800-53", ref: "SR-4, SA-10, RA-5, CM-8", note: "Provenance, developer configuration management, vulnerability scanning, and component inventory." },
    { std: "NIST 800-161", ref: "SR-3, SR-4, SR-11", note: "Supply chain controls, provenance, and component authenticity for software components." },
    { std: "PCI DSS 4.0", ref: "Req 6.3.2", note: "Inventory of bespoke and custom software and third-party components to facilitate vulnerability management." },
    { std: "NIST CSF 2.0", ref: "PR.DS-08", note: "Integrity of hardware and software verified." },
  ],

  // ===== Business Enablement =====
  be1: [
    { std: "NIST 800-53", ref: "SA-9, SA-9(5), AC-20", note: "External system services, processing/storage location, and use of external systems for cloud." },
    { std: "HIPAA", ref: "§164.308(b)(1), §164.314", note: "BAAs with cloud providers and organizational requirements for arrangements." },
    { std: "PCI DSS 4.0", ref: "Req 12.8, 12.9", note: "TPSPs managed with agreements and acknowledgments of PCI DSS responsibilities." },
    { std: "DORA", ref: "Art. 28-30", note: "ICT third-party risk management including cloud service provider due diligence." },
    { std: "NIST CSF 2.0", ref: "GV.SC-03", note: "Cybersecurity supply chain risk management is integrated into risk management." },
  ],
  be2: [
    { std: "NIST 800-53", ref: "CA-3, PL-2, PM-10", note: "Information exchange agreements, system security plans, and authorization process — applied to acquired entities." },
    { std: "PCI DSS 4.0", ref: "Req 12.8", note: "Third-party relationships managed — acquisition targets become service providers or integrated entities." },
    { std: "NIST CSF 2.0", ref: "ID.AM", note: "Asset management — identifying and managing assets from acquired organizations." },
  ],
  be3: [
    { std: "NIST 800-53", ref: "IA-3, SI-4, SA-9", note: "Device identification/authentication, monitoring for IoT, and external system services." },
    { std: "NIST 800-183", ref: "Full document", note: "Networks of 'Things' — IoT networking, security, and trust considerations." },
    { std: "PCI DSS 4.0", ref: "Req 1.2, 2.2", note: "Network security for IoT devices and secure configuration of system components." },
    { std: "DORA", ref: "Art. 8(1)", note: "Identification and classification of all ICT systems including IoT assets." },
  ],
  be4: [
    { std: "NIST 800-53", ref: "AC-17, AC-19, AC-20", note: "Remote access, access control for mobile devices, and use of external systems." },
    { std: "NIST 800-171", ref: "3.1.12, 3.1.18, 3.1.19", note: "Monitor/control remote access, control CUI on mobile devices, and encrypt CUI on mobile devices." },
    { std: "PCI DSS 4.0", ref: "Req 8.4.2, 12.3.1", note: "MFA for all remote access to CDE and risk analysis for remote work scenarios." },
    { std: "HIPAA", ref: "§164.312(a)(2)(iv), §164.310(b)", note: "Encryption/decryption for remote ePHI access and workstation use requirements." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Policies for physical and logical access to ICT systems including remote access." },
  ],
  be5: [
    { std: "NIST 800-53", ref: "CP-1 thru CP-13", note: "Full contingency planning family for business continuity and disaster recovery." },
    { std: "HIPAA", ref: "§164.308(a)(7)(i)-(v)", note: "Contingency plan including data backup, disaster recovery, emergency mode, testing, and criticality analysis." },
    { std: "PCI DSS 4.0", ref: "Req 12.10", note: "Respond immediately to a security incident including recovery procedures." },
    { std: "DORA", ref: "Art. 11, Art. 12", note: "ICT business continuity policy and plans, response/recovery, and testing." },
    { std: "NIST CSF 2.0", ref: "RC.RP", note: "Recovery plan is executed during or after an event." },
  ],

  // ===== Team & Culture Management =====
  tm1: [
    { std: "NIST 800-53", ref: "AT-1 thru AT-6, PM-13, PM-14", note: "Awareness and training family — policy, literacy training, role-based training, records, and information security workforce." },
    { std: "NIST 800-171", ref: "3.2.1, 3.2.2, 3.2.3", note: "Ensure security awareness, ensure training for roles, and provide awareness of insider threat indicators." },
    { std: "HIPAA", ref: "§164.308(a)(5)", note: "Security awareness and training — security reminders, protection from malicious software, log-in monitoring, and password management." },
    { std: "PCI DSS 4.0", ref: "Req 12.6", note: "Security awareness program, education on threats, and personnel acknowledgment of policies." },
    { std: "DORA", ref: "Art. 13(6)", note: "Mandatory training programs including ICT security awareness and digital operational resilience training." },
    { std: "GDPR", ref: "Art. 39(1)(b)", note: "DPO tasks include awareness-raising and training of staff involved in processing." },
  ],
  tm3: [
    { std: "NIST 800-53", ref: "PS-1 thru PS-9, PM-13", note: "Personnel security family — policy, position risk designation, screening, termination, transfer, and information security workforce." },
    { std: "NIST 800-171", ref: "3.9.1, 3.9.2", note: "Screen individuals prior to access and protect CUI during personnel actions." },
    { std: "HIPAA", ref: "§164.308(a)(3)", note: "Workforce security — authorization/supervision, workforce clearance, and termination procedures." },
    { std: "PCI DSS 4.0", ref: "Req 12.7", note: "Personnel are screened to reduce risks from insider threats." },
    { std: "DORA", ref: "Art. 5(4)", note: "Allocation of ICT budget and adequate staffing for ICT risk management." },
  ],
  tm4: [
    { std: "NIST 800-53", ref: "PM-3, PM-11, SA-1", note: "Information security resources, mission/business process definition, and acquisition considerations." },
    { std: "DORA", ref: "Art. 5(4), Art. 6(8)", note: "Appropriate allocation of ICT investments and budgets for digital operational resilience." },
    { std: "PCI DSS 4.0", ref: "Req 12.1, 12.5", note: "Information security policy covering resource allocation and scoping documentation." },
    { std: "NIST CSF 2.0", ref: "GV.RR-02", note: "Roles and responsibilities for cybersecurity — includes resourcing." },
  ],
  tm5: [
    { std: "NIST 800-53", ref: "AT-2, AT-3, PM-13", note: "Literacy training and awareness, role-based training, and information security workforce development." },
    { std: "NIST 800-171", ref: "3.2.1, 3.2.2", note: "Ensure managers and users are aware of security risks, and role-based training." },
    { std: "DORA", ref: "Art. 13(6)", note: "Compulsory ICT security training programmes appropriate to job function." },
    { std: "NIST CSF 2.0", ref: "GV.RR-04", note: "Adequate cybersecurity resources — people with needed skills." },
  ],
  tm6: [
    { std: "NIST CSF 2.0", ref: "GV.OC-01, GV.RR", note: "Organizational mission is understood and informs cybersecurity risk management, and roles are established." },
    { std: "GDPR", ref: "Art. 5(2), Art. 24", note: "Accountability principle — demonstrated compliance requires internal transparency and documentation." },
    { std: "DORA", ref: "Art. 5(2)", note: "Management body defined, approves, oversees, and is accountable — requires culture of trust and transparency." },
  ],
};

// ===== SUPPLEMENTAL: SOC 2, ISO 27001, NIST AI RMF, ISO 42001 =====
const STANDARDS_SUPPLEMENT = {
  so1: [
    { std: "SOC 2", ref: "CC6.1, CC6.6, CC6.7, CC6.8", note: "Logical/physical access controls, system boundary security, restrict transmission/movement of info, and prevent/detect unauthorized software." },
    { std: "ISO 27001", ref: "A.8.20, A.8.21, A.8.22, A.8.23", note: "Network security, security of network services, segregation in networks, and web filtering." },
  ],
  so2: [
    { std: "SOC 2", ref: "CC7.1, CC3.2", note: "Detect and monitor for security events including vulnerability identification, and risk assessment identifying threats." },
    { std: "ISO 27001", ref: "A.8.8, A.8.9", note: "Management of technical vulnerabilities and configuration management." },
  ],
  so3: [
    { std: "SOC 2", ref: "CC7.2, CC7.3, CC4.1", note: "Monitor system components for anomalies, evaluate security events, and design/implement monitoring activities." },
    { std: "ISO 27001", ref: "A.8.15, A.8.16", note: "Logging and monitoring — event logging and monitoring activities for anomalous behavior." },
  ],
  so4: [
    { std: "SOC 2", ref: "CC4.1, CC3.2", note: "Select/develop/perform ongoing evaluations, and risk assessment including through offensive testing." },
    { std: "ISO 27001", ref: "A.8.8, A.5.35, A.5.36", note: "Technical vulnerability management, independent review of information security, and compliance with policies." },
  ],
  so5: [
    { std: "SOC 2", ref: "CC7.4, CC7.1", note: "Respond to identified security incidents including automated response, and configuration management for detection." },
    { std: "ISO 27001", ref: "A.8.9", note: "Configuration management — maintaining correct configuration including through automation." },
  ],
  ir1: [
    { std: "SOC 2", ref: "CC7.3, CC7.4, CC7.5", note: "Evaluate security events, respond to identified incidents, and recover from identified incidents." },
    { std: "ISO 27001", ref: "A.5.24, A.5.25, A.5.26, A.6.8", note: "IR planning/preparation, assessment of security events, response to incidents, and reporting." },
  ],
  ir2: [
    { std: "SOC 2", ref: "A1.2, A1.3, CC7.5", note: "Recovery measures — environmental protections, recovery infrastructure, and incident recovery." },
    { std: "ISO 27001", ref: "A.5.29, A.5.30, A.8.13, A.8.14", note: "Security during disruption, ICT readiness for BC, backup of information, and redundancy." },
  ],
  ir4: [
    { std: "SOC 2", ref: "CC2.2, CC2.3, CC7.4", note: "Internal communication, communicate with external parties, and respond to incidents." },
    { std: "ISO 27001", ref: "A.5.24, A.6.8, A.5.5", note: "IR planning including communications, reporting security events, and contact with authorities." },
  ],
  ir5: [
    { std: "SOC 2", ref: "CC7.4, CC2.3", note: "Respond to identified incidents including notification, and communicate with external parties." },
    { std: "ISO 27001", ref: "A.5.5, A.5.6", note: "Contact with authorities and contact with special interest groups for incident reporting." },
  ],
  ir6: [
    { std: "SOC 2", ref: "CC7.5, CC4.2", note: "Recover from incidents and evaluate/communicate deficiencies — post-incident review." },
    { std: "ISO 27001", ref: "A.5.27", note: "Learning from information security incidents — knowledge gained used to strengthen controls." },
  ],
  ia1: [
    { std: "SOC 2", ref: "CC6.1, CC6.2, CC6.3", note: "Logical/physical access security, new user registration/authorization, and removal/modification of access rights." },
    { std: "ISO 27001", ref: "A.5.15, A.5.16, A.5.17, A.5.18, A.8.2, A.8.3", note: "Access control, identity management, authentication info, access rights lifecycle, privileged access, and source code access." },
  ],
  ia2: [
    { std: "SOC 2", ref: "CC6.1, CC6.6", note: "Logical access security including authentication mechanisms and system boundary protection." },
    { std: "ISO 27001", ref: "A.5.17, A.8.5", note: "Authentication information management and secure authentication mechanisms." },
  ],
  ia3: [
    { std: "SOC 2", ref: "CC6.1, CC6.3", note: "Logical access controls including federated identity, and role-based access provisioning." },
    { std: "ISO 27001", ref: "A.5.16, A.5.17", note: "Identity management across systems and authentication information." },
  ],
  ia4: [
    { std: "SOC 2", ref: "CC6.1, CC6.2, CC6.3", note: "Logical access including privileged controls, new user registration with privilege assignment, and access modification." },
    { std: "ISO 27001", ref: "A.8.2, A.8.18", note: "Privileged access rights — restricted and managed, and use of privileged utility programs." },
  ],
  ia5: [
    { std: "SOC 2", ref: "CC6.1, CC6.6, CC6.7", note: "Logical access enforcement, system boundary protection, and info transmission restriction — continuous verification." },
    { std: "ISO 27001", ref: "A.5.15, A.8.1, A.8.5", note: "Access control policy, user endpoint devices, and secure authentication — zero trust principles." },
  ],
  gv1: [
    { std: "SOC 2", ref: "CC1.1, CC1.2, CC1.3, CC5.1", note: "Commitment to integrity, board independence, management structure, and control activities." },
    { std: "ISO 27001", ref: "Clause 5, Clause 6", note: "Leadership — commitment, policy, roles; and Planning — addressing risks, security objectives." },
  ],
  gv2: [
    { std: "SOC 2", ref: "CC1.1, CC3.1", note: "Control environment and specifying objectives aligned to standards." },
    { std: "ISO 27001", ref: "Clause 4.1, 4.2, 4.3", note: "Understanding the organization, interested party requirements, and scope determination." },
  ],
  gv3: [
    { std: "SOC 2", ref: "CC1.1, CC1.4, CC2.1, CC5.2", note: "Integrity/ethics, accountability enforcement, internal communication of policies, and policy implementation." },
    { std: "ISO 27001", ref: "Clause 5.2, A.5.1, A.5.2, A.5.4", note: "Information security policy, policies for infosec, acceptable use, and management direction." },
  ],
  gv4: [
    { std: "SOC 2", ref: "CC4.1, CC4.2", note: "Select/develop/perform ongoing evaluations, and evaluate/communicate deficiencies." },
    { std: "ISO 27001", ref: "Clause 9.1, 9.2, 9.3, 10.1", note: "Monitoring/measurement, internal audit, management review, and continual improvement." },
  ],
  gv5: [
    { std: "SOC 2", ref: "CC1.1, CC2.2, CC2.3", note: "Commitment to integrity/ethical values, internal communication, and external communication — trust principles." },
    { std: "ISO 27001", ref: "Clause 5.1, 5.2, 4.2", note: "Leadership commitment, infosec policy as organizational value, and interested party needs." },
  ],
  rm1: [
    { std: "SOC 2", ref: "CC3.1, CC3.2, CC3.3, CC3.4, CC9.1", note: "Specify objectives, identify/analyze risks, assess fraud risk, identify changes, and risk mitigation." },
    { std: "ISO 27001", ref: "Clause 6.1, 8.2, A.5.7, A.5.8", note: "Actions to address risk, risk assessment, threat intelligence, and infosec in project management." },
  ],
  rm2: [
    { std: "SOC 2", ref: "CC4.1, CC4.2, CC2.3", note: "Ongoing evaluations, evaluate/communicate deficiencies, and communicate with external parties (auditors)." },
    { std: "ISO 27001", ref: "Clause 9.2, 9.3, A.5.35, A.5.36", note: "Internal audit, management review, independent review, and compliance with policies." },
  ],
  rm3: [
    { std: "SOC 2", ref: "CC6.5, C1.1, C1.2, P1.1", note: "Secure disposal, confidentiality classification, confidentiality disposal, and privacy notice." },
    { std: "ISO 27001", ref: "A.5.9, A.5.10, A.5.12, A.5.33, A.5.34", note: "Inventory of assets, acceptable use, classification, protection of records, and privacy/PII." },
  ],
  rm4: [
    { std: "SOC 2", ref: "CC6.4, CC6.5", note: "Physical access restrictions and secure disposal/decommissioning of physical assets." },
    { std: "ISO 27001", ref: "A.7.1, A.7.2, A.7.3, A.7.4, A.7.5", note: "Physical security perimeters, entry controls, securing offices, monitoring, and protecting against threats." },
  ],
  rm5: [
    { std: "SOC 2", ref: "CC9.1, CC9.2", note: "Risk mitigation including risk transfer, and vendor/business partner risk management." },
    { std: "ISO 27001", ref: "Clause 6.1.3", note: "Information security risk treatment — accept, transfer, mitigate, or avoid." },
  ],
  sa1: [
    { std: "SOC 2", ref: "CC6.1, CC6.6", note: "Logical access security and system boundary protection — enforcement of zero trust boundaries." },
    { std: "ISO 27001", ref: "A.8.20, A.8.21, A.8.22", note: "Network security, security of network services, and segregation in networks." },
  ],
  sa2: [
    { std: "SOC 2", ref: "CC6.1, CC6.6, CC6.7", note: "Layered logical access, boundary protection, and restricted info transmission." },
    { std: "ISO 27001", ref: "A.8.20, A.8.22, A.8.24, A.8.26", note: "Network security, network segregation, use of cryptography, and application security requirements." },
  ],
  sa3: [
    { std: "SOC 2", ref: "CC6.1, CC6.7, CC9.2", note: "Logical access in cloud, info transmission restrictions, and vendor risk for cloud providers." },
    { std: "ISO 27001", ref: "A.5.23, A.8.20, A.8.26", note: "Information security for cloud services, network security, and application security requirements." },
  ],
  sa4: [
    { std: "SOC 2", ref: "CC8.1, CC7.1, CC5.2", note: "Change management authorization/testing, configuration management, and policies for control activities." },
    { std: "ISO 27001", ref: "A.8.25, A.8.26, A.8.27, A.8.28, A.8.31, A.8.33", note: "Secure development lifecycle, app security reqs, secure architecture, secure coding, env separation, and test info." },
  ],
  sa5: [
    { std: "SOC 2", ref: "A1.1, A1.2, A1.3", note: "Availability: capacity management, recovery environment protection, and recovery infrastructure/testing." },
    { std: "ISO 27001", ref: "A.5.29, A.5.30, A.8.13, A.8.14", note: "Security during disruption, ICT readiness for BC, information backup, and redundancy." },
  ],
  ai1: [
    { std: "NIST AI RMF", ref: "Govern 1.1-1.7, Govern 2-6", note: "Full governance function — legal/regulatory mapping, AI inventory, risk tolerance, roles, AI policies, and oversight." },
    { std: "ISO 42001", ref: "Clause 5, 6, A.2, A.3", note: "Leadership and AI management system planning; A.2 AI policies, A.3 internal organization for AI governance." },
    { std: "SOC 2", ref: "CC1.1, CC5.1, CC5.2", note: "Integrity/ethics, control activities selection, and policy deployment — applied to AI governance." },
    { std: "ISO 27001", ref: "Clause 5.2, A.5.1", note: "Information security policy — extended to AI systems." },
  ],
  ai2: [
    { std: "NIST AI RMF", ref: "Map 2.1-2.3, Measure 2.6-2.11, Govern 3", note: "Categorize AI for bias/fairness, measure trustworthiness (fairness, explainability, privacy), and workforce diversity." },
    { std: "ISO 42001", ref: "A.4, A.5, A.6.1, A.10, B.3, B.5", note: "Resources for AI, assessing AI impacts, lifecycle documentation, third-party relations, and AI impact assessments." },
    { std: "SOC 2", ref: "PI1.1, PI1.2, P1.1", note: "Processing integrity — inputs complete/accurate, processing accurate/timely, and privacy notice for automated decisions." },
    { std: "ISO 27001", ref: "A.5.1, A.5.8", note: "Policies covering AI ethics, and integrating AI security into project management." },
  ],
  ai3: [
    { std: "NIST AI RMF", ref: "Govern 1.1, Map 1.1-1.6", note: "Legal/regulatory awareness for AI and context mapping — understanding AI systems in use." },
    { std: "ISO 42001", ref: "Clause 4.1, 4.2, A.6.2.2, B.6.2", note: "Understanding AI context, interested parties, AI system inventory management, and documentation." },
    { std: "SOC 2", ref: "CC6.8, CC7.1", note: "Prevent/detect unauthorized software (shadow AI) and configuration management for system components." },
    { std: "ISO 27001", ref: "A.5.9, A.8.9", note: "Inventory of assets and configuration management — AI systems as managed assets." },
  ],
  ai4: [
    { std: "NIST AI RMF", ref: "Measure 2.5-2.7, Manage 2.1-2.4", note: "Measure AI security properties and manage AI risks including adversarial robustness and model integrity." },
    { std: "ISO 42001", ref: "A.6.2.4, A.6.2.6, A.8, B.6.2", note: "AI security/robustness, data quality/provenance, AI operation/monitoring, and documentation." },
    { std: "SOC 2", ref: "CC7.1, CC7.2, CC6.8", note: "Configuration mgmt, monitor anomalies, and prevent unauthorized software — applied to AI security." },
    { std: "ISO 27001", ref: "A.8.25, A.8.28, A.8.8", note: "Secure development, secure coding, and vulnerability management — applied to AI/ML systems." },
  ],
  ai5: [
    { std: "NIST AI RMF", ref: "Govern 1.4, Govern 6, Map 2.3, Manage 4", note: "Risk management processes, feedback mechanisms, autonomy categorization, and residual risk treatment." },
    { std: "ISO 42001", ref: "A.5, A.6.1.3, A.9, B.5, B.7", note: "Assessing AI impacts, responsible AI, third-party interactions, impact assessments, and data for AI." },
    { std: "SOC 2", ref: "CC6.1, CC5.2", note: "Logical access and policy/procedures — applied to agentic AI permissions." },
    { std: "ISO 27001", ref: "A.8.2, A.8.15", note: "Privileged access rights for AI agents and logging of AI agent activities." },
  ],
  ai6: [
    { std: "NIST AI RMF", ref: "Map 3.1-3.5, Measure 1-4", note: "AI benefits/costs and risk measurement — evaluating AI-enabled security tool effectiveness." },
    { std: "ISO 42001", ref: "A.6.2.3, A.8, B.6.1", note: "AI system engineering, operation/monitoring, and planned results of AI activities." },
    { std: "SOC 2", ref: "CC7.1, CC7.2", note: "Configuration management and anomaly monitoring — AI tools as security components." },
    { std: "ISO 27001", ref: "A.8.16", note: "Monitoring activities — AI-augmented security monitoring." },
  ],
  sc1: [
    { std: "SOC 2", ref: "CC9.2, CC2.3", note: "Vendor and business partner risk assessment/management and external communication." },
    { std: "ISO 27001", ref: "A.5.19, A.5.20, A.5.21, A.5.22, A.5.23", note: "Supplier relationships, security in agreements, ICT supply chain, monitoring/review, and cloud services." },
  ],
  sc2: [
    { std: "SOC 2", ref: "CC7.1, CC8.1", note: "Configuration management including software components and change management for updates." },
    { std: "ISO 27001", ref: "A.5.19, A.8.9, A.8.28", note: "Supplier relationships, configuration management for dependencies, and secure coding for third-party components." },
  ],
  sc5: [
    { std: "SOC 2", ref: "CC9.2, CC3.2", note: "Vendor risk assessment and organizational risk identification including concentration." },
    { std: "ISO 27001", ref: "A.5.21, A.5.22", note: "Managing ICT supply chain security and monitoring/reviewing supplier services." },
  ],
  sc7: [
    { std: "SOC 2", ref: "CC2.3, CC9.2", note: "External communication and vendor transparency commitments." },
    { std: "ISO 27001", ref: "A.5.20, A.5.22", note: "Addressing security within supplier agreements and monitoring/reviewing supplier services." },
  ],
  sc8: [
    { std: "SOC 2", ref: "CC7.3, CC7.4, CC9.2", note: "Evaluate events, respond to incidents, and manage vendor risk — supply chain incident handling." },
    { std: "ISO 27001", ref: "A.5.24, A.5.21", note: "Incident management and ICT supply chain security during incidents." },
  ],
  dp1: [
    { std: "SOC 2", ref: "CC6.5, C1.1, C1.2", note: "Secure information disposal, confidentiality classification, and confidentiality disposal." },
    { std: "ISO 27001", ref: "A.5.9, A.5.10, A.5.12, A.5.13, A.5.14", note: "Inventory of assets, acceptable use, classification, labeling, and information transfer." },
  ],
  dp2: [
    { std: "SOC 2", ref: "P1.1, P2.1, P3.1, P3.2, P6.1-P6.7", note: "Privacy criteria — notice, choice/consent, collection, use/retention/disposal, and quality." },
    { std: "ISO 27001", ref: "A.5.34, A.8.11, A.8.12, A.8.24", note: "Privacy/PII protection, data masking, data leakage prevention, and cryptography." },
  ],
  dp3: [
    { std: "SOC 2", ref: "P2.1, P4.1, P4.2, P4.3, P5.1, P5.2", note: "Choice/consent, access for subjects, correction, and dispute resolution — full data subject rights." },
    { std: "ISO 27001", ref: "A.5.34", note: "Privacy and protection of PII — including support for data subject rights." },
  ],
  dp4: [
    { std: "SOC 2", ref: "P6.1, P6.4, C1.1", note: "Use/retention/disposal, unauthorized disclosure prevention, and confidentiality commitments." },
    { std: "ISO 27001", ref: "A.5.14, A.5.34", note: "Information transfer policies and privacy/PII protection across jurisdictions." },
  ],
  dp5: [
    { std: "SOC 2", ref: "P1.1, P1.2, CC1.1", note: "Privacy notice, coverage of privacy commitments, and commitment to integrity/ethical values." },
    { std: "ISO 27001", ref: "A.5.1, A.5.34", note: "Policies for information security and privacy/PII protection." },
    { std: "ISO 42001", ref: "A.4, A.5, B.3, B.5", note: "Resources for AI, assessing AI impacts, risk assessments, and impact assessments — data ethics in AI context." },
  ],
  as1: [
    { std: "SOC 2", ref: "CC8.1, CC7.1", note: "Change management including development standards, and configuration management." },
    { std: "ISO 27001", ref: "A.8.25, A.8.26, A.8.27, A.8.28", note: "Secure development lifecycle, app security requirements, secure architecture, and secure coding." },
  ],
  as3: [
    { std: "SOC 2", ref: "CC8.1", note: "Changes to infrastructure, data, software, and procedures authorized, designed, developed, tested, and approved." },
    { std: "ISO 27001", ref: "A.8.25, A.8.31, A.8.32, A.8.33", note: "Secure development lifecycle, separation of environments, change management, and test information." },
  ],
  as5: [
    { std: "SOC 2", ref: "CC6.1, CC6.6, CC6.7", note: "Logical access, system boundaries, and information transmission — applied to API interfaces." },
    { std: "ISO 27001", ref: "A.8.24, A.8.26", note: "Use of cryptography and application security requirements — applied to API security." },
  ],
  as6: [
    { std: "SOC 2", ref: "CC6.6, CC6.7, CC7.2", note: "System boundary protection, restrict info transmission, and monitor anomalies — application layer." },
    { std: "ISO 27001", ref: "A.8.20, A.8.26", note: "Network security and application security requirements — WAF as application defense." },
  ],
  as9: [
    { std: "SOC 2", ref: "CC7.1, CC8.1", note: "Configuration management including software inventory and change management for component updates." },
    { std: "ISO 27001", ref: "A.5.19, A.8.9, A.8.28", note: "Supplier relationships, configuration management, and secure coding — open source as supply chain." },
  ],
  be1: [
    { std: "SOC 2", ref: "CC9.2, CC6.1, A1.1", note: "Vendor risk management, logical access for cloud, and availability capacity management." },
    { std: "ISO 27001", ref: "A.5.23, A.5.19, A.5.22", note: "Cloud services, supplier relationships, and monitoring/review." },
  ],
  be2: [
    { std: "SOC 2", ref: "CC9.2, CC3.4", note: "Vendor risk management and identifying/assessing changes — M&A as organizational change." },
    { std: "ISO 27001", ref: "Clause 6.3, A.5.8", note: "Planning of changes and information security in project management." },
  ],
  be3: [
    { std: "SOC 2", ref: "CC6.1, CC6.8, CC7.1", note: "Logical access, unauthorized software prevention, and configuration management for IoT." },
    { std: "ISO 27001", ref: "A.8.1, A.8.9, A.5.9", note: "User endpoint devices, configuration management, and inventory — IoT as managed devices." },
  ],
  be4: [
    { std: "SOC 2", ref: "CC6.1, CC6.6, CC6.7", note: "Logical access, boundary protection, and info transmission — remote/mobile access controls." },
    { std: "ISO 27001", ref: "A.6.7, A.8.1", note: "Remote working and user endpoint devices." },
  ],
  be5: [
    { std: "SOC 2", ref: "A1.1, A1.2, A1.3", note: "Availability criteria — capacity management, environmental protections, and recovery testing." },
    { std: "ISO 27001", ref: "A.5.29, A.5.30, A.8.14", note: "Security during disruption, ICT readiness for BC, and redundancy." },
  ],
  tm1: [
    { std: "SOC 2", ref: "CC1.4, CC2.2", note: "Accountability for security responsibilities and internal communication including awareness." },
    { std: "ISO 27001", ref: "A.6.3, Clause 7.3", note: "Information security awareness/education/training and organizational awareness." },
  ],
  tm3: [
    { std: "SOC 2", ref: "CC1.3, CC1.4, CC1.5", note: "Organizational structure, accountability, and attract/develop/retain competent individuals." },
    { std: "ISO 27001", ref: "A.6.1, A.6.2, A.6.4, A.6.5, Clause 7.2", note: "Screening, terms of employment, disciplinary process, post-employment, and competence." },
  ],
  tm4: [
    { std: "SOC 2", ref: "CC1.3, CC5.1", note: "Management structures including resource allocation and control activity design." },
    { std: "ISO 27001", ref: "Clause 7.1, 5.1", note: "Resources and leadership commitment to ISMS." },
  ],
  tm5: [
    { std: "SOC 2", ref: "CC1.4, CC1.5", note: "Accountability enforcement and attract/develop/retain competent individuals." },
    { std: "ISO 27001", ref: "A.6.3, Clause 7.2", note: "Information security awareness/education/training and competence." },
    { std: "ISO 42001", ref: "Clause 7.2, A.4", note: "Competence for AI management system and resources for AI." },
  ],
  tm6: [
    { std: "SOC 2", ref: "CC1.1, CC1.2, CC2.2", note: "Integrity/ethical values, board governance, and internal communication — trust culture foundations." },
    { std: "ISO 27001", ref: "Clause 5.1, 5.2, 7.4", note: "Leadership commitment, infosec policy, and communication — transparency culture." },
  ],
};

// Merge supplement into main map
Object.keys(STANDARDS_SUPPLEMENT).forEach((key) => {
  if (STANDARDS_MAP[key]) {
    STANDARDS_MAP[key] = STANDARDS_MAP[key].concat(STANDARDS_SUPPLEMENT[key]);
  } else {
    STANDARDS_MAP[key] = STANDARDS_SUPPLEMENT[key];
  }
});

// ===== CMMC 2.0 Mappings =====
const CMMC_MAP = {
  so1: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.1, SC.L2-3.13.6, SC.L2-3.13.8, SI.L2-3.14.2, SI.L2-3.14.6", note: "Boundary protection, network communication by exception, CUI in transit, malicious code protection, and monitoring inbound/outbound traffic." }],
  so2: [{ std: "CMMC 2.0", ref: "RA.L2-3.11.2, RA.L2-3.11.3, SI.L2-3.14.1", note: "Vulnerability scanning, remediation of vulnerabilities, and flaw remediation for organizational systems." }],
  so3: [{ std: "CMMC 2.0", ref: "AU.L2-3.3.1, AU.L2-3.3.5, SI.L2-3.14.6, SI.L2-3.14.7", note: "System-level auditing, audit review/analysis/reporting, monitor for attacks, and identify unauthorized use." }],
  so4: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.1, RA.L2-3.11.2", note: "Assess security controls periodically and scan for vulnerabilities — offensive testing validates control effectiveness." }],
  so5: [{ std: "CMMC 2.0", ref: "SI.L2-3.14.1, CA.L2-3.12.3", note: "Flaw remediation including automated patching, and continuous monitoring of security controls." }],
  ir1: [{ std: "CMMC 2.0", ref: "IR.L2-3.6.1, IR.L2-3.6.2, IR.L2-3.6.3", note: "Establish IR capability for organizational systems, track/document/report incidents, and test IR capability." }],
  ir2: [{ std: "CMMC 2.0", ref: "IR.L2-3.6.1, MP.L2-3.8.9, RE.L2-3.14.2", note: "IR operations including ransomware scenarios, system backup for recovery, and malicious code protection." }],
  ir4: [{ std: "CMMC 2.0", ref: "IR.L2-3.6.2", note: "Track, document, and report incidents to designated officials and/or authorities." }],
  ir5: [{ std: "CMMC 2.0", ref: "IR.L2-3.6.2", note: "Report incidents to designated officials — CMMC requires reporting to DoD within 72 hours for CUI incidents." }],
  ir6: [{ std: "CMMC 2.0", ref: "IR.L2-3.6.3", note: "Test incident response capability and incorporate lessons learned into future operations." }],
  ia1: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.1, IA.L2-3.5.1, IA.L2-3.5.2, PS.L2-3.9.2", note: "Limit system access, identify users/processes, authenticate identities, and ensure CUI protection during personnel actions." }],
  ia2: [{ std: "CMMC 2.0", ref: "IA.L2-3.5.3, IA.L2-3.5.7, IA.L2-3.5.8", note: "Multi-factor authentication for network access to privileged accounts, network access to non-privileged, and local access to privileged." }],
  ia3: [{ std: "CMMC 2.0", ref: "IA.L2-3.5.1, IA.L2-3.5.2, AC.L2-3.1.1", note: "Identify and authenticate users, processes, and devices including across federated environments." }],
  ia4: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.5, AC.L2-3.1.6, AC.L2-3.1.7, IA.L2-3.5.3", note: "Least privilege, restrict privileged access to security functions, prevent non-privileged users from executing privileged functions, and MFA for privileged accounts." }],
  ia5: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.3, SC.L2-3.13.1, IA.L2-3.5.3", note: "Control CUI flow, monitor/control communications at boundaries, and MFA — zero trust enforcement principles." }],
  gv1: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4, PM controls (L3)", note: "System security plan describing boundaries, operational environment, and implementation of requirements." }],
  gv2: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4, CA.L2-3.12.1", note: "CMMC is itself a framework — L2 maps to NIST 800-171, L3 adds 800-172 requirements." }],
  gv3: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4, AC.L2-3.1.1, AC.L2-3.1.2", note: "System security plan, limit access per authorized use, and limit access to types of transactions — policy-driven." }],
  gv4: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.1, CA.L2-3.12.3", note: "Assess security controls and monitor controls on an ongoing basis — metrics-driven assessment." }],
  gv5: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4", note: "System security plan documentation demonstrates trustworthiness of CUI protection to DoD assessors." }],
  rm1: [{ std: "CMMC 2.0", ref: "RA.L2-3.11.1, RA.L2-3.11.2, RA.L2-3.11.3", note: "Periodically assess risk, scan for vulnerabilities, and remediate vulnerabilities per risk prioritization." }],
  rm2: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.1, CA.L2-3.12.2, CA.L2-3.12.3", note: "Assess security controls, develop POA&Ms, and monitor controls — the CMMC assessment process itself." }],
  rm3: [{ std: "CMMC 2.0", ref: "MP.L2-3.8.1, MP.L2-3.8.3, MP.L2-3.8.4, MP.L2-3.8.5", note: "Protect system media, sanitize media before disposal/reuse, mark media with CUI markings, and control access to media." }],
  rm4: [{ std: "CMMC 2.0", ref: "PE.L2-3.10.1, PE.L2-3.10.2, PE.L2-3.10.5", note: "Limit physical access, protect and monitor the physical facility, and manage physical access to information systems." }],
  rm5: [{ std: "CMMC 2.0", ref: "RA.L2-3.11.1", note: "Risk assessment informs risk transfer decisions — CMMC requires risk-based approach to CUI protection." }],
  sa1: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.1, SC.L2-3.13.2, AC.L2-3.1.3", note: "Monitor/control communications at boundaries, employ architectural designs for segmentation, and control CUI flow." }],
  sa2: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.1, SC.L2-3.13.2, SC.L2-3.13.6", note: "Boundary protection, architectural designs including subnetting, and deny-by-default network communications." }],
  sa3: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.1, AC.L2-3.1.20", note: "Boundary protection (cloud boundaries) and control connections to external systems including cloud." }],
  sa4: [{ std: "CMMC 2.0", ref: "SA.L2-3.13.2, SI.L2-3.14.1, CM.L2-3.4.3", note: "Architectural security designs, identify and correct flaws, and track/review/approve configuration changes." }],
  sa5: [{ std: "CMMC 2.0", ref: "MP.L2-3.8.9, IR.L2-3.6.1", note: "Protect availability of CUI through system backups and establish IR capability including recovery." }],
  ai1: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4, AC.L2-3.1.1", note: "System security plan must cover AI systems processing CUI, and access to AI systems must be limited to authorized use." }],
  ai2: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4", note: "Responsible AI practices for CUI-processing AI systems must be documented in the system security plan." }],
  ai3: [{ std: "CMMC 2.0", ref: "CM.L2-3.4.1, CM.L2-3.4.2", note: "Establish/maintain baseline configurations and establish/enforce security configuration settings — AI systems as managed components." }],
  ai4: [{ std: "CMMC 2.0", ref: "SI.L2-3.14.1, SI.L2-3.14.2, RA.L2-3.11.2", note: "Flaw remediation, malicious code protection, and vulnerability scanning — applied to AI system attack surfaces." }],
  ai5: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.5, AC.L2-3.1.7, AU.L2-3.3.1", note: "Least privilege for AI agents, prevent non-privileged functions from executing privileged operations, and audit AI agent activities." }],
  ai6: [{ std: "CMMC 2.0", ref: "SI.L2-3.14.6, SI.L2-3.14.7", note: "Monitor for attacks and identify unauthorized use — AI as a tool for enhancing these CMMC-required capabilities." }],
  sc1: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.20, CA.L2-3.12.4, SR.L2 (L3)", note: "Control external system connections, document third-party boundaries in SSP, and supply chain risk management at Level 3." }],
  sc2: [{ std: "CMMC 2.0", ref: "CM.L2-3.4.1, CM.L2-3.4.8, SI.L2-3.14.1", note: "Baseline configurations including software inventory, restrict/disable nonessential functions, and flaw remediation for dependencies." }],
  sc5: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.20, RA.L2-3.11.1", note: "External system connections and risk assessment — concentration risk as supply chain risk vector." }],
  sc7: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4", note: "System security plan must document external service providers and their security responsibilities." }],
  sc8: [{ std: "CMMC 2.0", ref: "IR.L2-3.6.1, IR.L2-3.6.2", note: "Establish IR capability and track/report incidents — including supply chain compromise events affecting CUI." }],
  dp1: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.22, MP.L2-3.8.1, MP.L2-3.8.3, MP.L2-3.8.4", note: "Control CUI posted publicly, protect media, sanitize before disposal, and mark media with CUI designations." }],
  dp2: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.8, SC.L2-3.13.11, MP.L2-3.8.6", note: "CUI encryption in transit, CUI encryption at rest, and implement cryptographic mechanisms for portable storage — privacy engineering for CUI." }],
  dp3: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.22", note: "Control information posted to publicly accessible systems — consent and rights management for CUI disclosure." }],
  dp4: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.8, AC.L2-3.1.20", note: "CUI encryption in transit and external system connections — cross-boundary CUI transfer controls." }],
  dp5: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.22, CA.L2-3.12.4", note: "CUI handling ethics documented in system security plan and controlled on publicly accessible systems." }],
  as1: [{ std: "CMMC 2.0", ref: "SI.L2-3.14.1, SA.L2-3.13.2", note: "Flaw remediation and architectural security designs — secure development for CUI-processing applications." }],
  as3: [{ std: "CMMC 2.0", ref: "CM.L2-3.4.3, CM.L2-3.4.4, CM.L2-3.4.5", note: "Track/review/approve changes, analyze security impact of changes, and enforce access restrictions for change." }],
  as5: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.8, IA.L2-3.5.1, AC.L2-3.1.3", note: "CUI in transit via API, identify users/processes/devices at API endpoints, and control CUI flow through APIs." }],
  as6: [{ std: "CMMC 2.0", ref: "SC.L2-3.13.1, SI.L2-3.14.2, SI.L2-3.14.6", note: "Boundary protection at application layer, malicious code protection, and monitoring for application-level attacks." }],
  as9: [{ std: "CMMC 2.0", ref: "CM.L2-3.4.1, CM.L2-3.4.8, SI.L2-3.14.1", note: "Baseline configurations including component inventory, restrict nonessential functions, and flaw remediation for OSS." }],
  be1: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.20, CA.L2-3.12.4", note: "Control connections to external systems (cloud) and document cloud boundaries in system security plan." }],
  be2: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4, AC.L2-3.1.20", note: "SSP must be updated for acquired systems and connections to acquired entity networks must be controlled." }],
  be3: [{ std: "CMMC 2.0", ref: "IA.L2-3.5.1, CM.L2-3.4.1, AC.L2-3.1.20", note: "Identify IoT devices, maintain baseline configurations, and control external connections for IoT." }],
  be4: [{ std: "CMMC 2.0", ref: "AC.L2-3.1.12, AC.L2-3.1.18, AC.L2-3.1.19", note: "Monitor/control remote access, control CUI on mobile devices, and encrypt CUI on mobile devices." }],
  be5: [{ std: "CMMC 2.0", ref: "MP.L2-3.8.9, IR.L2-3.6.1", note: "System backup for CUI availability and IR capability including business recovery." }],
  tm1: [{ std: "CMMC 2.0", ref: "AT.L2-3.2.1, AT.L2-3.2.2, AT.L2-3.2.3", note: "Security awareness for all users, role-based training for personnel with security responsibilities, and insider threat awareness." }],
  tm3: [{ std: "CMMC 2.0", ref: "PS.L2-3.9.1, PS.L2-3.9.2", note: "Screen individuals prior to authorizing access to CUI and protect CUI during personnel actions (termination/transfer)." }],
  tm4: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.2, CA.L2-3.12.4", note: "Develop/implement POA&Ms and maintain system security plan — both require budgeted resources." }],
  tm5: [{ std: "CMMC 2.0", ref: "AT.L2-3.2.1, AT.L2-3.2.2", note: "Ensure users are aware of security risks and ensure role-based training for personnel with CUI responsibilities." }],
  tm6: [{ std: "CMMC 2.0", ref: "CA.L2-3.12.4", note: "System security plan as a trust artifact — documents the organization's CUI protection commitment transparently." }],
};

// Merge CMMC into main map
Object.keys(CMMC_MAP).forEach((key) => {
  if (STANDARDS_MAP[key]) {
    STANDARDS_MAP[key] = STANDARDS_MAP[key].concat(CMMC_MAP[key]);
  } else {
    STANDARDS_MAP[key] = CMMC_MAP[key];
  }
});

// ========== ORGANIZATIONAL STAKEHOLDER MAP ==========
const STAKEHOLDERS_MAP = {
  // Security Operations
  so1: [
    { role: "IT Operations / Infrastructure", why: "Owns the network, endpoints, and servers where prevention controls are deployed and must be maintained." },
    { role: "End Users / All Employees", why: "Subject to DLP, content filtering, and acceptable use enforcement — their daily work is directly impacted." },
    { role: "Procurement", why: "Security tool acquisition flows through procurement — vendor selection, licensing, and renewals." },
  ],
  so2: [
    { role: "Software Engineering / DevOps", why: "Owns the code and infrastructure that needs patching — vuln remediation competes with feature delivery for sprint capacity." },
    { role: "IT Operations", why: "Responsible for infrastructure patching, OS updates, and network device firmware upgrades." },
    { role: "Product Management", why: "Must negotiate remediation timelines against product roadmap commitments and customer-facing deadlines." },
  ],
  so3: [
    { role: "IT Operations", why: "Provides the log sources, network taps, and infrastructure telemetry that the SOC depends on for detection." },
    { role: "HR", why: "Insider threat investigations require HR partnership for policy enforcement, due process, and employee relations." },
    { role: "Executive Leadership", why: "SOC escalation paths terminate at executive leadership — they make go/no-go decisions during critical incidents." },
  ],
  so4: [
    { role: "Facilities / Physical Security", why: "Physical red team engagements require coordination with building management and onsite security personnel." },
    { role: "HR", why: "Social engineering tests target employees — HR must be informed to manage concerns and avoid morale damage." },
    { role: "General Counsel / Legal", why: "Engagement authorization, scope boundaries, and rules of engagement require legal sign-off." },
  ],
  so5: [
    { role: "IT Operations / DevOps", why: "Automated patching, IaC security, and SOAR integrations touch production systems that IT/DevOps manages." },
    { role: "Finance", why: "Automation tooling (SOAR, SIEM, ML infrastructure) represents significant recurring investment requiring financial oversight." },
    { role: "Data Engineering / Analytics", why: "ML model pipelines and data feeds for security analytics may share data infrastructure." },
  ],

  // Incident Response
  ir1: [
    { role: "Executive Leadership / C-Suite", why: "Must authorize response actions, approve external communications, and make business-critical decisions under time pressure." },
    { role: "General Counsel / Legal", why: "Embedded in IR from the start — privilege, evidence preservation, regulatory obligations, and liability assessment." },
    { role: "IT Operations", why: "Executes technical containment actions — network isolation, system shutdown, credential resets." },
    { role: "Communications / PR", why: "Prepares holding statements, coordinates media response, and manages public-facing messaging." },
  ],
  ir2: [
    { role: "IT Operations / Infrastructure", why: "Owns backup infrastructure, restoration procedures, and production system recovery sequences." },
    { role: "Finance / CFO", why: "Ransom payment decisions, insurance claim activation, and recovery cost authorization require financial leadership." },
    { role: "Business Unit Leaders", why: "Define recovery priorities — which systems are business-critical and need to be restored first." },
    { role: "Insurance Broker / Carrier", why: "Cyber insurance activates during ransomware events — carrier's breach counsel and forensic panel engage immediately." },
  ],
  ir4: [
    { role: "Communications / PR", why: "Owns external messaging, press responses, and customer communication — the voice of the organization in crisis." },
    { role: "Customer Success / Account Management", why: "Key customer relationships require direct, personalized communication during material incidents." },
    { role: "Board of Directors", why: "Must be briefed on material incidents per governance obligations and fiduciary duties." },
    { role: "Investor Relations", why: "Public companies must coordinate incident disclosure with IR teams for SEC/market obligations." },
  ],
  ir5: [
    { role: "General Counsel / Legal", why: "Drives regulatory notification strategy — which regulators, what language, and jurisdictional coordination." },
    { role: "Privacy Officer / DPO", why: "GDPR, CCPA, and HIPAA breach notification obligations are the privacy team's direct responsibility." },
    { role: "Government Affairs / Regulatory", why: "Existing relationships with regulators smooth notification processes and reduce friction." },
    { role: "External Breach Counsel", why: "Specialist attorneys manage privilege, coordinate forensics, and interface with regulators on the organization's behalf." },
  ],
  ir6: [
    { role: "All Involved Departments", why: "Blameless postmortems require every team that participated in response to share their perspective openly." },
    { role: "Quality / Process Improvement", why: "Lessons learned must be integrated into organizational processes — QA teams formalize improvements." },
    { role: "Executive Leadership", why: "Must endorse and resource post-incident remediation — unfunded lessons learned are just documentation." },
  ],

  // Identity & Access Management
  ia1: [
    { role: "HR / People Operations", why: "Hires, transfers, and terminations trigger identity lifecycle events — HR is the authoritative source of employment status." },
    { role: "IT Operations / Service Desk", why: "Executes provisioning/deprovisioning, handles access requests, and manages directory services." },
    { role: "Business Unit Managers", why: "Approve access requests for their teams and certify access during periodic reviews." },
  ],
  ia2: [
    { role: "End Users / All Employees", why: "Must enroll in and use MFA daily — their experience with authentication directly impacts adoption and security posture." },
    { role: "IT Service Desk", why: "Handles MFA lockouts, token replacements, and authentication troubleshooting at scale." },
    { role: "Customer Experience / Product", why: "Customer-facing MFA must balance security with usability — product teams own the customer auth experience." },
  ],
  ia3: [
    { role: "IT Operations / Enterprise Architecture", why: "Manages directory services, federation trust relationships, and IdP infrastructure across environments." },
    { role: "Product / Engineering", why: "Customer-facing SSO integration (OAuth, SAML) is a product feature that engineering builds and maintains." },
    { role: "Partner / Channel Management", why: "Federated access for partners requires business relationship management alongside technical integration." },
  ],
  ia4: [
    { role: "IT Operations / Platform Engineering", why: "Manages service accounts, API keys, and infrastructure credentials that PAM must govern." },
    { role: "Database Administrators / SREs", why: "Hold critical privileged access to production data and infrastructure — primary PAM stakeholders." },
    { role: "Internal Audit", why: "Reviews privileged access logs, certification completeness, and segregation of duties violations." },
  ],
  ia5: [
    { role: "Enterprise Architecture", why: "Zero trust architecture spans the entire IT estate — enterprise architects own the technical roadmap." },
    { role: "Network Engineering", why: "Micro-segmentation, SASE deployment, and network policy enforcement require network team execution." },
    { role: "Executive Sponsor / CIO", why: "Zero trust is a multi-year transformation requiring sustained executive sponsorship and investment." },
  ],

  // Governance & Strategy
  gv1: [
    { role: "CEO / Executive Leadership", why: "Security strategy must align with business strategy — the CEO sets the strategic direction security must support." },
    { role: "Board of Directors", why: "Cyber risk is a board-level governance concern — the board approves risk appetite and strategic investment." },
    { role: "CFO / Finance", why: "Strategic priorities must be funded — the CFO validates that security investment aligns with financial capacity." },
  ],
  gv2: [
    { role: "Internal Audit", why: "Auditors assess against chosen frameworks — framework selection directly determines what gets audited." },
    { role: "General Counsel / Legal", why: "Legal identifies regulatory obligations that mandate specific framework adoption (HIPAA, CMMC, DORA)." },
    { role: "Compliance Officer", why: "Manages framework mapping, control documentation, and regulatory change tracking across the organization." },
  ],
  gv3: [
    { role: "All Department Heads", why: "Policies define acceptable behavior across the organization — every department must understand and enforce them." },
    { role: "HR", why: "Policy violations trigger HR processes — disciplinary actions, training requirements, and employment consequences." },
    { role: "General Counsel / Legal", why: "Policies have legal force — legal reviews policy language for enforceability and regulatory alignment." },
  ],
  gv4: [
    { role: "Board of Directors", why: "Primary consumer of executive security metrics — metrics must answer the questions the board is asking." },
    { role: "CFO / Finance", why: "Risk quantification in financial terms (CRQ) is the language finance speaks — ROSI justifies investment." },
    { role: "Internal Audit", why: "Control effectiveness metrics are primary audit evidence — auditors validate that controls work as intended." },
  ],
  gv5: [
    { role: "CEO / Executive Leadership", why: "Trust must be a leadership commitment — executives set the tone for organizational transparency." },
    { role: "Marketing / Brand", why: "Trust is a brand differentiator — marketing articulates the trust commitment to customers and prospects." },
    { role: "Sales / Business Development", why: "Trust artifacts (SOC 2 reports, transparency pages) directly support sales cycles and customer due diligence." },
    { role: "Customer Success", why: "Customer-facing trust activities (security reviews, questionnaire responses) are a daily customer success function." },
  ],

  // Risk Management & Compliance
  rm1: [
    { role: "Business Unit Leaders", why: "Own the business processes and assets being assessed — risk context comes from the business, not just security." },
    { role: "Internal Audit", why: "Risk assessment findings feed audit planning and are validated through audit procedures." },
    { role: "CFO / Finance", why: "Cyber risk quantification translates to financial exposure — the CFO needs to understand risk in dollar terms." },
    { role: "Enterprise Risk Management", why: "Cyber risk must integrate with enterprise risk — ERM owns the consolidated organizational risk picture." },
  ],
  rm2: [
    { role: "Internal Audit", why: "Conducts independent verification of control effectiveness and manages audit findings/remediation tracking." },
    { role: "Compliance Officer", why: "Manages regulatory mapping, evidence collection, and relationship with external auditors." },
    { role: "External Auditors", why: "Provide independent assurance through SOC 2, ISO 27001 certification, CMMC assessments, and regulatory examinations." },
    { role: "Business Unit Leaders", why: "Control owners across the organization must provide evidence and maintain controls in their areas." },
  ],
  rm3: [
    { role: "General Counsel / Legal", why: "Owns legal obligations — contracts, investigations, privilege, data retention schedules, and regulatory interpretation." },
    { role: "Records Management", why: "Manages data retention and destruction schedules, legal holds, and records lifecycle across the organization." },
    { role: "Privacy Officer / DPO", why: "Data protection impact assessments, data mapping, and privacy regulatory obligations." },
    { role: "Procurement", why: "Vendor contracts include security/data terms that procurement negotiates and legal reviews." },
  ],
  rm4: [
    { role: "Facilities / Physical Security", why: "Owns physical access controls, surveillance, environmental protections, and building security." },
    { role: "Operations / Manufacturing", why: "Owns OT/ICS systems — safety and operational continuity must be balanced with cybersecurity." },
    { role: "Safety / EHS", why: "OT security failures can have life-safety implications — safety teams define acceptable risk boundaries." },
  ],
  rm5: [
    { role: "CFO / Finance", why: "Insurance is a financial risk transfer — premium costs, deductibles, and coverage gaps are financial decisions." },
    { role: "General Counsel / Legal", why: "Policy language, exclusions, and claims processes require legal interpretation and negotiation." },
    { role: "Risk Management / ERM", why: "Cyber insurance is one component of the organization's overall risk transfer strategy." },
    { role: "Insurance Broker", why: "Navigates the cyber insurance market, presents the organization to underwriters, and advocates during claims." },
  ],

  // Security Architecture
  sa1: [
    { role: "Enterprise Architecture", why: "Zero trust is an architectural transformation that must align with the organization's broader technology architecture." },
    { role: "Network Engineering", why: "Implements micro-segmentation, SASE agents, and network policy enforcement at the infrastructure level." },
    { role: "CIO / IT Leadership", why: "Zero trust impacts every technology touchpoint — IT leadership must sponsor and prioritize the transformation." },
  ],
  sa2: [
    { role: "Network Engineering", why: "Designs and maintains network segmentation, VLANs, firewall rules, and encryption infrastructure." },
    { role: "IT Operations", why: "Operates the defense-in-depth layers daily — monitoring, maintaining, and troubleshooting network controls." },
  ],
  sa3: [
    { role: "Cloud Engineering / Platform Teams", why: "Builds and maintains cloud infrastructure, container orchestration, and serverless functions that architecture must secure." },
    { role: "Enterprise Architecture", why: "Multi-cloud strategy and cloud security patterns must align with the enterprise architecture roadmap." },
    { role: "Procurement / Vendor Management", why: "Cloud provider selection, contract negotiation, and SLA management." },
  ],
  sa4: [
    { role: "Software Engineering / Development", why: "Developers implement secure coding practices, participate in threat modeling, and remediate SAST/DAST findings." },
    { role: "Product Management", why: "Balances security requirements against feature velocity and customer delivery commitments in sprint planning." },
    { role: "QA / Testing", why: "Security testing integrates with QA processes — functional and security testing share infrastructure and timing." },
  ],
  sa5: [
    { role: "IT Operations / Infrastructure", why: "Owns backup infrastructure, replication targets, multi-site failover, and DR testing execution." },
    { role: "Business Unit Leaders", why: "Define RTO/RPO requirements — business criticality determines how much resilience each system needs." },
    { role: "Facilities", why: "Multi-site resilience requires physical infrastructure — secondary data centers, network diversity, and power redundancy." },
  ],

  // AI Governance & Responsible AI
  ai1: [
    { role: "CEO / Executive Leadership", why: "AI governance is a strategic and reputational decision — leadership must define the organization's AI posture." },
    { role: "General Counsel / Legal", why: "AI regulations are emerging rapidly — legal tracks obligations, liability exposure, and IP implications." },
    { role: "Data Science / ML Engineering", why: "Builds and deploys the AI systems that governance must oversee — they need to understand and follow AI policy." },
    { role: "Chief Data Officer / CDO", why: "AI governance intersects data governance — data quality, lineage, and ethical use underpin responsible AI." },
  ],
  ai2: [
    { role: "Data Science / ML Engineering", why: "Implements bias testing, fairness metrics, and explainability — responsible AI is a technical and ethical practice." },
    { role: "DEI / Ethics Committee", why: "Algorithmic bias intersects organizational diversity and equity commitments — DEI teams provide critical perspective." },
    { role: "Product Management", why: "Customer-facing AI features must meet ethical standards — product teams decide what ships to users." },
    { role: "General Counsel / Legal", why: "Automated decision-making has legal implications — GDPR Art. 22, EU AI Act, and emerging US state laws." },
  ],
  ai3: [
    { role: "All Department Heads", why: "Shadow AI is an organization-wide problem — every department may be using unsanctioned AI tools with company data." },
    { role: "IT Operations", why: "Network monitoring and SaaS management tools can detect unauthorized AI service usage." },
    { role: "Procurement", why: "Approved AI tool catalog must be managed through procurement with proper vendor assessment and contracting." },
  ],
  ai4: [
    { role: "Data Science / ML Engineering", why: "Owns the AI systems that must be secured — training pipelines, model endpoints, and data ingestion." },
    { role: "Software Engineering", why: "AI applications are software — AppSec practices must extend to ML codebases and model serving infrastructure." },
    { role: "IT Operations / Platform", why: "AI infrastructure (GPU clusters, model registries, API gateways) must be hardened and monitored." },
  ],
  ai5: [
    { role: "Business Process Owners", why: "Agentic AI automates business processes — process owners must define acceptable autonomy boundaries." },
    { role: "General Counsel / Legal", why: "Autonomous AI decisions may have legal, contractual, and liability implications requiring legal review." },
    { role: "Risk Management / ERM", why: "Agentic AI introduces novel risk categories — autonomous agent failures need risk quantification." },
    { role: "Data Science / ML Engineering", why: "Implements guardrails, kill-switches, and permission boundaries in the agent architecture." },
  ],
  ai6: [
    { role: "SOC Analysts / Security Engineers", why: "Direct operators of AI-enabled security tools — they must trust, tune, and validate AI model outputs." },
    { role: "Data Science / ML Engineering", why: "Builds and trains the ML models that power AI-enabled detection and automation." },
    { role: "Finance", why: "AI/ML security tooling (compute, licensing, talent) is a growing budget line item requiring financial oversight." },
  ],

  // Supply Chain Transparency
  sc1: [
    { role: "Procurement / Vendor Management", why: "Owns vendor relationships, contract negotiations, and the business decision to engage third parties." },
    { role: "General Counsel / Legal", why: "Negotiates security terms, data processing agreements, and liability clauses in vendor contracts." },
    { role: "Business Unit Leaders", why: "Sponsor vendor relationships and define business requirements that drive vendor selection." },
    { role: "Internal Audit", why: "Validates TPRM program effectiveness and reviews vendor risk assessment completeness." },
  ],
  sc2: [
    { role: "Software Engineering / DevOps", why: "Uses open-source components daily — SBOM generation and dependency management happens in their pipelines." },
    { role: "Procurement", why: "Commercial software contracts must include SBOM requirements and supply chain security obligations." },
    { role: "Product Management", why: "Customers increasingly demand SBOMs — product teams must factor supply chain transparency into roadmaps." },
  ],
  sc5: [
    { role: "Enterprise Architecture", why: "Architectural decisions create vendor concentration — multi-cloud and platform diversity are architecture choices." },
    { role: "Procurement", why: "Must track the full vendor portfolio to identify single-vendor dependencies and concentration risk." },
    { role: "Business Continuity", why: "Vendor concentration directly threatens continuity — BC planning must include vendor failover scenarios." },
  ],
  sc7: [
    { role: "Sales / Customer Success", why: "Customers demand vendor transparency — security reviews, questionnaires, and trust center content enable deals." },
    { role: "Marketing", why: "Trust pages, security certifications, and transparency reports are marketing assets that build customer confidence." },
    { role: "Legal / Privacy", why: "Subprocessor lists, DPA disclosures, and data flow documentation are legal obligations made transparent." },
  ],
  sc8: [
    { role: "Procurement / Vendor Management", why: "First point of contact with vendors during supply chain incidents — owns the relationship and escalation." },
    { role: "Communications / PR", why: "Supply chain incidents affecting customers require coordinated external communication." },
    { role: "Business Continuity", why: "Supply chain disruptions trigger business continuity plans — alternate vendors and workarounds." },
  ],

  // Data Practices & Privacy
  dp1: [
    { role: "Chief Data Officer / CDO", why: "Owns organizational data strategy, data governance framework, and data quality standards." },
    { role: "Business Unit Leaders", why: "Data owners within each business unit define classification, access, and retention for their data domains." },
    { role: "IT Operations / Database Administration", why: "Manages the systems where data lives — storage, backup, access controls, and lifecycle automation." },
    { role: "Records Management", why: "Implements retention schedules, legal holds, and destruction processes across the data lifecycle." },
  ],
  dp2: [
    { role: "Privacy Officer / DPO", why: "Owns privacy program — PIAs, privacy-by-design reviews, and regulatory compliance for personal data." },
    { role: "Software Engineering", why: "Implements privacy controls in code — encryption, tokenization, data minimization, and consent mechanisms." },
    { role: "Product Management", why: "Privacy is a product feature — customers expect privacy-by-design in the products they use." },
  ],
  dp3: [
    { role: "Privacy Officer / DPO", why: "Manages DSR fulfillment processes, consent frameworks, and regulatory response timelines." },
    { role: "Customer Support", why: "First point of contact for data subject requests — support teams triage and route privacy inquiries." },
    { role: "IT Operations / Engineering", why: "Technically executes data deletion, export, and correction requests across systems." },
    { role: "Legal", why: "Reviews edge-case DSRs, competing legal obligations (litigation holds vs. deletion), and regulatory interpretation." },
  ],
  dp4: [
    { role: "Legal / Privacy", why: "Transfer impact assessments, SCCs, and adequacy determinations are legal analyses." },
    { role: "IT Operations / Cloud Engineering", why: "Technical decisions about data residency, cloud regions, and replication directly impact cross-border flows." },
    { role: "Procurement", why: "Vendor contracts must include data processing locations and transfer mechanism requirements." },
    { role: "Government Affairs", why: "Geopolitical changes affect data transfer frameworks — Schrems decisions, executive orders, and trade agreements." },
  ],
  dp5: [
    { role: "Ethics Committee / Board", why: "Data ethics is a governance-level decision about organizational values and acceptable use of information." },
    { role: "Chief Data Officer / CDO", why: "Operationalizes ethical data practices through data governance frameworks and acceptable use policies." },
    { role: "DEI / Social Impact", why: "Ethical data use intersects equity and inclusion — biased data practices disproportionately affect marginalized groups." },
  ],

  // Application Security
  as1: [
    { role: "Software Engineering / Development", why: "Writes the code — secure development is fundamentally a developer responsibility enabled by security tooling." },
    { role: "Engineering Managers", why: "Prioritize security training, allocate sprint time for security fixes, and enforce secure coding standards." },
    { role: "QA / Testing", why: "Security testing is part of quality assurance — QA integrates SAST/DAST into test plans." },
  ],
  as3: [
    { role: "DevOps / Platform Engineering", why: "Owns CI/CD pipelines where security tools are embedded — pipeline design determines security integration points." },
    { role: "Software Engineering", why: "Developers interact with DevSecOps gates daily — build failures and security findings affect their workflow." },
    { role: "Release Management", why: "Security gates can block releases — release managers negotiate risk-based deployment decisions." },
  ],
  as5: [
    { role: "Software Engineering / API Teams", why: "Designs, builds, and maintains APIs — API security starts with secure design patterns." },
    { role: "Product Management", why: "APIs are product features — rate limits, auth requirements, and data exposure are product decisions." },
    { role: "Partner / Integration Teams", why: "Third-party API consumers need documentation, authentication guidance, and secure integration patterns." },
  ],
  as6: [
    { role: "IT Operations / Network", why: "Deploys and manages WAF, DDoS protection, and bot management infrastructure." },
    { role: "Software Engineering", why: "WAF bypass investigation and application-layer fix implementation require developer involvement." },
  ],
  as9: [
    { role: "Software Engineering", why: "Makes daily decisions about which open-source components to use — they're the first line of SCA." },
    { role: "Legal", why: "Open-source license compliance is a legal obligation — copyleft, attribution, and commercial use restrictions." },
    { role: "Procurement", why: "Commercial alternatives to open-source components require procurement evaluation and budget." },
  ],

  // Business Enablement
  be1: [
    { role: "CIO / IT Leadership", why: "Owns the cloud strategy — cloud security must enable, not constrain, the organization's digital transformation." },
    { role: "Cloud Engineering / Platform", why: "Builds and operates cloud infrastructure — security architecture must be embedded in their workflows." },
    { role: "Finance / CFO", why: "Cloud spend is a significant and growing cost center — security requirements affect cloud architecture costs." },
    { role: "Procurement", why: "Cloud vendor selection, enterprise agreement negotiation, and SLA management." },
  ],
  be2: [
    { role: "Corporate Development / M&A", why: "Security due diligence is part of acquisition evaluation — findings can affect deal valuation and terms." },
    { role: "CIO / IT Leadership", why: "Leads technology integration for acquired entities — IAM, network, and tool consolidation." },
    { role: "HR", why: "Employee onboarding from acquired companies triggers mass identity lifecycle events." },
    { role: "Finance / CFO", why: "Security remediation costs for acquired entities are part of integration budgeting." },
  ],
  be3: [
    { role: "Product / Innovation", why: "IoT devices are often product components — security requirements must be part of product design." },
    { role: "Operations / Manufacturing", why: "OT and IoT converge on the factory floor — operational teams manage the physical devices." },
    { role: "R&D / Engineering", why: "Evaluating emerging technologies (quantum, edge computing) is a research and engineering function." },
  ],
  be4: [
    { role: "HR / People Operations", why: "Remote work and BYOD policies are HR policy decisions that security must enable and protect." },
    { role: "End Users / All Employees", why: "Every remote worker is a stakeholder — their home environment is now part of the security perimeter." },
    { role: "IT Service Desk", why: "Supports remote workers with VPN, device management, and authentication issues at scale." },
  ],
  be5: [
    { role: "Business Continuity / DR Owner", why: "Owns BC/DR planning, testing cadence, and recovery prioritization across the organization." },
    { role: "Business Unit Leaders", why: "Define recovery priorities and maximum tolerable downtime for their critical business processes." },
    { role: "Executive Leadership", why: "Declares disasters, authorizes emergency spending, and makes business-critical recovery decisions." },
    { role: "Facilities / Real Estate", why: "Alternate site activation, workspace recovery, and physical infrastructure redundancy." },
  ],

  // Team & Culture Management
  tm1: [
    { role: "HR / Learning & Development", why: "Owns the organizational training platform, tracks completion, and integrates security training into onboarding." },
    { role: "Communications / Internal Comms", why: "Security awareness campaigns need internal communications support for reach and engagement." },
    { role: "All Department Managers", why: "Reinforce security culture in their teams — managers set behavioral expectations beyond formal training." },
  ],
  tm3: [
    { role: "HR / Recruiting", why: "Partners on security role requisitions, compensation benchmarking, and talent pipeline development." },
    { role: "Finance / CFO", why: "Headcount budget approval, contractor vs. FTE decisions, and compensation competitiveness." },
    { role: "Executive Leadership", why: "Staffing decisions are strategic — the right team composition enables or constrains the security program." },
  ],
  tm4: [
    { role: "CFO / Finance", why: "Approves and manages the security budget — CapEx/OpEx allocation, forecasting, and variance tracking." },
    { role: "Procurement", why: "Tool licensing, consultant contracts, and vendor renewals flow through procurement processes." },
    { role: "Executive Leadership", why: "Budget prioritization reflects strategic priorities — leadership arbitrates between competing investments." },
  ],
  tm5: [
    { role: "HR / Learning & Development", why: "Manages training budgets, certification programs, and career development frameworks." },
    { role: "Individual Contributors", why: "Skills development is ultimately an individual investment — motivation and growth mindset matter." },
    { role: "Engineering / DevOps Leaders", why: "Cross-functional skill needs (DevSecOps, cloud security) require collaboration with engineering leadership." },
  ],
  tm6: [
    { role: "CEO / Executive Leadership", why: "Trust culture starts at the top — executives must model transparency and psychological safety." },
    { role: "HR", why: "Reporting protections, blameless investigation standards, and whistleblower policies are HR-managed frameworks." },
    { role: "Communications / Internal Comms", why: "Internal transparency requires communication channels and practices that make openness the norm." },
    { role: "All Employees", why: "Trust culture only works if everyone participates — it's a collective commitment, not a policy mandate." },
  ],
};

function polarToCart(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function truncate(str, max) { return str.length > max ? str.slice(0, max - 1) + "…" : str; }

const CX = 0, CY = 0;
const count = FRAMEWORK.children.length;
const OUTER_RADIUS = 290;
const CHILD_DISTANCE = 155;
const getAngle = (i) => (360 / count) * i - 90;
const getChildSpread = (n, isExpanded) => {
  if (isExpanded) {
    return Math.max(16, Math.min(30, 150 / n));
  }
  const mx = 360 / count - 4; const id = 28; return (n - 1) * id > mx ? mx / (n - 1) : id;
};

const branchPositions = {};
FRAMEWORK.children.forEach((branch, i) => {
  const angle = getAngle(i);
  branchPositions[branch.id] = polarToCart(CX, CY, OUTER_RADIUS, angle);
});

function computeChildPositions(expandedId) {
  const positions = {};
  FRAMEWORK.children.forEach((branch, i) => {
    const angle = getAngle(i);
    const pos = branchPositions[branch.id];
    const isExp = branch.id === expandedId;
    const n = branch.children.length;
    const dist = isExp ? (n >= 10 ? 270 : n >= 8 ? 250 : 235) : CHILD_DISTANCE;
    const spread = getChildSpread(n, isExp);
    branch.children.forEach((child, ci) => {
      const cAngle = angle - ((n - 1) * spread) / 2 + ci * spread;
      positions[child.id] = polarToCart(pos.x, pos.y, dist, cAngle);
    });
  });
  return positions;
}

function DepLine({ x1, y1, x2, y2, color, type }) {
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const off = dist * 0.18;
  const cx = (x1 + x2) / 2 - dy / dist * off;
  const cy = (y1 + y2) / 2 + dx / dist * off;
  const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  return <path d={d} stroke={color} strokeWidth={1.6} fill="none" opacity={0.55} strokeDasharray={type === "upstream" ? "8 4" : "4 2 1 2"} style={{ animation: `dashFlow 2s linear infinite` }} />;
}

function CurvedLine({ x1, y1, x2, y2, color, animated, delay = 0 }) {
  const dx = x2 - x1, dy = y2 - y1;
  const cx = (x1 + x2) / 2 - dy * 0.15, cy = (y1 + y2) / 2 + dx * 0.15;
  return <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke={color} strokeWidth={animated ? 2 : 1.5} fill="none" opacity={animated ? 0.8 : 0.15} style={{ transition: "opacity 0.4s", ...(animated ? { strokeDasharray: "6 4", animation: `dashFlow 1.5s linear infinite`, animationDelay: `${delay}s` } : {}) }} />;
}

export default function TrustMap() {
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const svgRef = useRef(null);
  const [viewBox, setViewBox] = useState({ x: -600, y: -600, w: 1200, h: 1200 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleBranch = useCallback((id) => { setExpanded((p) => (p === id ? null : id)); setSelected(null); }, []);
  const childPositions = useMemo(() => computeChildPositions(expanded), [expanded]);
  const handleWheel = useCallback((e) => { e.preventDefault(); setZoom((z) => Math.max(0.3, Math.min(3, z * (e.deltaY > 0 ? 1.08 : 0.92)))); }, []);
  useEffect(() => { const el = svgRef.current; if (el) { el.addEventListener("wheel", handleWheel, { passive: false }); return () => el.removeEventListener("wheel", handleWheel); } }, [handleWheel]);

  const sW = viewBox.w * zoom, sH = viewBox.h * zoom;
  const vb = `${viewBox.x - (sW - viewBox.w) / 2} ${viewBox.y - (sH - viewBox.h) / 2} ${sW} ${sH}`;

  const handlePointerDown = (e) => { if (e.target === svgRef.current || e.target.tagName === "rect") { setIsPanning(true); setPanStart({ x: e.clientX, y: e.clientY }); } };
  const handlePointerMove = (e) => { if (!isPanning) return; setViewBox((v) => ({ ...v, x: v.x - (e.clientX - panStart.x) * zoom, y: v.y - (e.clientY - panStart.y) * zoom })); setPanStart({ x: e.clientX, y: e.clientY }); };
  const handlePointerUp = () => setIsPanning(false);

  const matchingIds = new Set();
  const matchingBranches = new Set();
  if (searchTerm.length >= 2) {
    const t = searchTerm.toLowerCase();
    FRAMEWORK.children.forEach((b) => { if (b.label.replace(/\n/g, " ").toLowerCase().includes(t)) matchingBranches.add(b.id); b.children.forEach((c) => { if (c.label.toLowerCase().includes(t) || c.desc.toLowerCase().includes(t)) { matchingIds.add(c.id); matchingBranches.add(b.id); } }); });
  }
  const isFiltering = searchTerm.length >= 2;

  const selDeps = useMemo(() => {
    if (!selected) return null;
    const upstream = (DEP_ON[selected.id] || []).map((d) => ({ id: d.target, label: childLabelMap[d.target], branch: branchLabelMap[childToBranch[d.target]], reason: d.reason, branchId: childToBranch[d.target], color: branchColorMap[childToBranch[d.target]] }));
    const downstream = (DEP_BY[selected.id] || []).map((d) => ({ id: d.source, label: childLabelMap[d.source], branch: branchLabelMap[childToBranch[d.source]], reason: d.reason, branchId: childToBranch[d.source], color: branchColorMap[childToBranch[d.source]] }));
    return { upstream, downstream };
  }, [selected]);

  const connectedIds = useMemo(() => { if (!selDeps) return new Set(); const s = new Set(); selDeps.upstream.forEach((d) => { s.add(d.id); s.add(d.branchId); }); selDeps.downstream.forEach((d) => { s.add(d.id); s.add(d.branchId); }); return s; }, [selDeps]);
  const connectedBranches = useMemo(() => { if (!selDeps) return new Set(); const s = new Set(); selDeps.upstream.forEach((d) => s.add(d.branchId)); selDeps.downstream.forEach((d) => s.add(d.branchId)); if (expanded) s.add(expanded); return s; }, [selDeps, expanded]);

  const [depTab, setDepTab] = useState("info");
  useEffect(() => { setDepTab("info"); }, [selected]);

  const totalDeps = selDeps ? selDeps.upstream.length + selDeps.downstream.length : 0;

  return (
    <div style={{ width: "100%", height: "100vh", background: "linear-gradient(145deg, #0a0e1a 0%, #111827 40%, #0f172a 100%)", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", cursor: isPanning ? "grabbing" : "grab" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes dashFlow { to { stroke-dashoffset: -20; } }
        @keyframes pulseGlow { 0%,100%{opacity:.6}50%{opacity:1} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
        @keyframes depPulse { 0%,100%{opacity:.4}50%{opacity:.85} }
        .dep-item { transition: background 0.15s; border-radius: 6px; }
        .dep-item:hover { background: rgba(255,255,255,0.04); }
      `}</style>

      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, padding: "16px 22px", background: "linear-gradient(to bottom, rgba(10,14,26,0.97) 0%, rgba(10,14,26,0) 100%)", pointerEvents: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 10px #F59E0B", animation: "pulseGlow 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: "#F59E0B", textTransform: "uppercase" }}>Sidekick Security — Trust & Transparency Framework</span>
        </div>
        <h1 style={{ margin: "2px 0", fontSize: 17, fontWeight: 700, color: "#F1F5F9", letterSpacing: -0.5 }}>Integrated Trust Program Architecture</h1>
        <p style={{ margin: 0, fontSize: 10, color: "#64748B" }}>
          {count} domains · {FRAMEWORK.children.reduce((s, b) => s + b.children.length, 0)} capabilities · {DEP_EDGES.length} dependencies · {Object.keys(STANDARDS_MAP).length} standards-mapped
        </p>
        <div style={{ pointerEvents: "auto", marginTop: 6, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input type="text" placeholder="Search capabilities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 240, padding: "6px 11px", background: "rgba(30,41,59,0.9)", border: "1px solid #334155", borderRadius: 7, color: "#F1F5F9", fontSize: 11, fontFamily: "'DM Sans',sans-serif", outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "#F59E0B")} onBlur={(e) => (e.target.style.borderColor = "#334155")}
          />
          {selected && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2.5, borderRadius: 1, background: "#38BDF8", display: "inline-block" }} /><span style={{ fontSize: 9, color: "#64748B" }}>depends on ({selDeps?.upstream.length})</span></span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2.5, borderRadius: 1, background: "#FB923C", display: "inline-block" }} /><span style={{ fontSize: 9, color: "#64748B" }}>depended by ({selDeps?.downstream.length})</span></span>
              <span style={{ fontSize: 9, color: "#475569" }}>({totalDeps} total connections)</span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ position: "absolute", top: 112, right: 14, zIndex: 10, background: "rgba(15,23,42,0.88)", border: "1px solid #1e293b", borderRadius: 10, padding: "8px 12px", backdropFilter: "blur(12px)", maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
        <div style={{ fontSize: 8, fontFamily: "'JetBrains Mono',monospace", color: "#64748B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>Domains</div>
        {FRAMEWORK.children.map((b) => {
          const dimLegend = selected && connectedBranches.size > 0 && !connectedBranches.has(b.id);
          return (
            <div key={b.id} onClick={() => toggleBranch(b.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 6px", marginBottom: 1, borderRadius: 5, cursor: "pointer", background: expanded === b.id ? `${b.color}15` : "transparent", opacity: isFiltering && !matchingBranches.has(b.id) ? 0.25 : dimLegend ? 0.3 : 1, transition: "all 0.2s" }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: b.color, flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: expanded === b.id ? "#F1F5F9" : "#94A3B8", fontWeight: expanded === b.id ? 600 : 400, whiteSpace: "nowrap" }}>{b.label.replace(/\n/g, " ")}</span>
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selected && selDeps && (
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 20, maxWidth: 620, margin: "0 auto", background: "rgba(15,23,42,0.97)", border: `1px solid ${branchColorMap[childToBranch[selected.id]]}44`, borderRadius: 12, backdropFilter: "blur(20px)", animation: "fadeSlideIn 0.3s ease", maxHeight: "42vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 16px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono',monospace", color: branchColorMap[childToBranch[selected.id]], letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>{branchLabelMap[childToBranch[selected.id]]}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9" }}>{selected.label}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "1px solid #334155", borderRadius: 6, color: "#94A3B8", cursor: "pointer", padding: "2px 8px", fontSize: 10 }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 1, marginTop: 8, borderBottom: "1px solid #1e293b", overflowX: "auto", scrollbarWidth: "none" }}>
              {[{ key: "info", label: "Overview" }, { key: "upstream", label: `Depends On (${selDeps.upstream.length})` }, { key: "downstream", label: `Depended By (${selDeps.downstream.length})` }, { key: "standards", label: `Standards (${(STANDARDS_MAP[selected.id] || []).length})` }, { key: "stakeholders", label: `Stakeholders (${(STAKEHOLDERS_MAP[selected.id] || []).length})` }].map((tab) => (
                <button key={tab.key} onClick={() => setDepTab(tab.key)} style={{ background: depTab === tab.key ? "rgba(255,255,255,0.06)" : "transparent", border: "none", borderBottom: depTab === tab.key ? "2px solid #F59E0B" : "2px solid transparent", color: depTab === tab.key ? "#F1F5F9" : "#64748B", padding: "5px 10px", fontSize: 9.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: "8px 16px 12px", overflowY: "auto", flex: 1 }}>
            {depTab === "info" && (
              <div>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: "#94A3B8", margin: 0 }}>{selected.desc}</p>
                {selected.children && selected.children.length > 0 && (
                  <>
                    <div style={{ height: 1, background: "#1e293b", margin: "10px 0" }} />
                    <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono',monospace", color: "#64748B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Key Practices</div>
                    {selected.children.map((sub, i) => (
                      <div key={i} style={{ padding: "5px 8px", marginBottom: 3, borderLeft: "2px solid #334155", borderRadius: 2 }}>
                        <div style={{ fontSize: 10.5, fontWeight: 600, color: "#E2E8F0", marginBottom: 1 }}>{sub.label}</div>
                        <div style={{ fontSize: 10, lineHeight: 1.5, color: "#94A3B8" }}>{sub.desc}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
            {depTab === "upstream" && (selDeps.upstream.length === 0 ? <p style={{ fontSize: 11, color: "#475569", margin: 0, fontStyle: "italic" }}>No upstream dependencies mapped.</p> :
              selDeps.upstream.map((dep, i) => (
                <div key={`u${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 3, borderLeft: `3px solid ${dep.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: dep.color }}>{dep.label}</span>
                    <span style={{ fontSize: 8, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>· {dep.branch}</span>
                  </div>
                  <p style={{ fontSize: 10.5, lineHeight: 1.45, color: "#94A3B8", margin: 0 }}>{dep.reason}</p>
                </div>
              ))
            )}
            {depTab === "downstream" && (selDeps.downstream.length === 0 ? <p style={{ fontSize: 11, color: "#475569", margin: 0, fontStyle: "italic" }}>No downstream dependencies mapped.</p> :
              selDeps.downstream.map((dep, i) => (
                <div key={`d${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 3, borderLeft: `3px solid ${dep.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: dep.color }}>{dep.label}</span>
                    <span style={{ fontSize: 8, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>· {dep.branch}</span>
                  </div>
                  <p style={{ fontSize: 10.5, lineHeight: 1.45, color: "#94A3B8", margin: 0 }}>{dep.reason}</p>
                </div>
              ))
            )}
            {depTab === "standards" && (() => {
              const stds = STANDARDS_MAP[selected.id] || [];
              if (stds.length === 0) return <p style={{ fontSize: 11, color: "#475569", margin: 0, fontStyle: "italic" }}>No standards mapped for this capability.</p>;
              return stds.map((s, i) => (
                <div key={`s${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 4, borderLeft: `3px solid ${STD_COLORS[s.std] || "#64748B"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: STD_COLORS[s.std] || "#94A3B8", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 0.5, textTransform: "uppercase" }}>{s.std}</span>
                    <span style={{ fontSize: 9, color: "#F1F5F9", fontFamily: "'JetBrains Mono',monospace", background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: 3 }}>{s.ref}</span>
                  </div>
                  <p style={{ fontSize: 10.5, lineHeight: 1.45, color: "#94A3B8", margin: 0 }}>{s.note}</p>
                </div>
              ));
            })()}
            {depTab === "stakeholders" && (() => {
              const sth = STAKEHOLDERS_MAP[selected.id] || [];
              if (sth.length === 0) return <p style={{ fontSize: 11, color: "#475569", margin: 0, fontStyle: "italic" }}>No stakeholders mapped for this capability.</p>;
              return sth.map((s, i) => (
                <div key={`sh${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 4, borderLeft: "3px solid #94A3B8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#E2E8F0" }}>{s.role}</span>
                  </div>
                  <p style={{ fontSize: 10.5, lineHeight: 1.45, color: "#94A3B8", margin: 0 }}>{s.why}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* SVG */}
      <svg ref={svgRef} viewBox={vb} style={{ width: "100%", height: "100%", display: "block" }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
        <defs>
          <radialGradient id="centerGlow"><stop offset="0%" stopColor="#F59E0B" stopOpacity="0.12" /><stop offset="100%" stopColor="#F59E0B" stopOpacity="0" /></radialGradient>
          {FRAMEWORK.children.map((b) => (<radialGradient key={`g${b.id}`} id={`glow-${b.id}`}><stop offset="0%" stopColor={b.color} stopOpacity="0.18" /><stop offset="100%" stopColor={b.color} stopOpacity="0" /></radialGradient>))}
          <filter id="softGlow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect x="-3000" y="-3000" width="6000" height="6000" fill="transparent" />
        <circle cx={CX} cy={CY} r={180} fill="url(#centerGlow)" />
        <circle cx={CX} cy={CY} r={OUTER_RADIUS} fill="none" stroke="#1e293b" strokeWidth={0.5} strokeDasharray="4 6" />

        {/* Dependency lines for selected sub-node */}
        {selected && selDeps && (() => {
          const selPos = childPositions[selected.id];
          const lines = [];
          selDeps.upstream.forEach((dep, i) => {
            const tPos = dep.branchId === expanded ? childPositions[dep.id] : branchPositions[dep.branchId];
            if (tPos) { lines.push(<DepLine key={`u${i}`} x1={selPos.x} y1={selPos.y} x2={tPos.x} y2={tPos.y} color="#38BDF8" type="upstream" />); lines.push(<circle key={`ud${i}`} cx={tPos.x} cy={tPos.y} r={3.5} fill="#38BDF8" opacity={0.5} style={{ animation: "depPulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.05}s` }} />); }
          });
          selDeps.downstream.forEach((dep, i) => {
            const sPos = dep.branchId === expanded ? childPositions[dep.id] : branchPositions[dep.branchId];
            if (sPos) { lines.push(<DepLine key={`d${i}`} x1={sPos.x} y1={sPos.y} x2={selPos.x} y2={selPos.y} color="#FB923C" type="downstream" />); lines.push(<circle key={`dd${i}`} cx={sPos.x} cy={sPos.y} r={3.5} fill="#FB923C" opacity={0.5} style={{ animation: "depPulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.05}s` }} />); }
          });
          lines.push(<circle key="sg" cx={selPos.x} cy={selPos.y} r={18} fill="none" stroke="#F59E0B" strokeWidth={1.5} opacity={0.4} style={{ animation: "depPulse 1.5s ease-in-out infinite" }} />);
          return lines;
        })()}

        {/* Branch lines */}
        {FRAMEWORK.children.map((b, i) => <g key={`l${b.id}`} opacity={isFiltering && !matchingBranches.has(b.id) ? 0.1 : 1} style={{ transition: "opacity 0.3s" }}><CurvedLine x1={CX} y1={CY} x2={branchPositions[b.id].x} y2={branchPositions[b.id].y} color={b.color} animated={expanded === b.id || hoveredBranch === b.id} delay={i * 0.1} /></g>)}

        {/* Child lines */}
        {FRAMEWORK.children.map((b, i) => { if (expanded !== b.id) return null; const pos = branchPositions[b.id]; return b.children.map((c, ci) => { const cP = childPositions[c.id]; return <g key={`cl${c.id}`} opacity={isFiltering && !matchingIds.has(c.id) ? 0.1 : 1} style={{ transition: "opacity 0.3s" }}><CurvedLine x1={pos.x} y1={pos.y} x2={cP.x} y2={cP.y} color={b.color} animated delay={ci * 0.06} /></g>; }); })}

        {/* Branch nodes */}
        {FRAMEWORK.children.map((b, i) => {
          const pos = branchPositions[b.id]; const isExp = expanded === b.id; const isHov = hoveredBranch === b.id;
          const dimmed = isFiltering && !matchingBranches.has(b.id);
          const isCon = selected && connectedBranches.has(b.id);
          const shouldDim = selected && !isCon && !isExp;
          return (
            <g key={b.id} opacity={dimmed ? 0.1 : shouldDim ? 0.2 : 1} style={{ transition: "opacity 0.3s" }}>
              {(isExp || isHov || isCon) && <circle cx={pos.x} cy={pos.y} r={55} fill={`url(#glow-${b.id})`} />}
              <g style={{ cursor: "pointer" }} onClick={() => toggleBranch(b.id)} onMouseEnter={() => setHoveredBranch(b.id)} onMouseLeave={() => setHoveredBranch(null)}>
                <rect x={pos.x - 54} y={pos.y - 32} width={108} height={64} rx={10} fill={isExp ? `${b.color}18` : "#111827"} stroke={b.color} strokeWidth={isExp || isCon ? 2 : 1} opacity={isExp || isHov || isCon ? 1 : 0.7} style={{ transition: "all 0.3s" }} />
                <text x={pos.x} y={pos.y - 8} textAnchor="middle" style={{ fontSize: 16, pointerEvents: "none" }}>{b.icon}</text>
                {b.label.split("\n").map((l, li) => <text key={li} x={pos.x} y={pos.y + 8 + li * 12} textAnchor="middle" fill={isExp || isCon ? "#F1F5F9" : "#94A3B8"} style={{ fontSize: 9, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.3, transition: "fill 0.3s" }}>{l}</text>)}
              </g>
              {isExp && b.children.map((c, ci) => {
                const cP = childPositions[c.id];
                const isSel = selected?.id === c.id; const dimC = isFiltering && !matchingIds.has(c.id);
                const isDep = selected && connectedIds.has(c.id);
                const shouldDimC = selected && !isSel && !isDep;
                return (
                  <g key={c.id} opacity={dimC ? 0.1 : shouldDimC ? 0.25 : 1} style={{ transition: "opacity 0.3s" }}>
                    <g style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setSelected(c); }}>
                      <rect x={cP.x - 68} y={cP.y - 14} width={136} height={28} rx={7} fill={isSel ? `${b.color}30` : isDep ? "rgba(255,255,255,0.06)" : "#0f172a"} stroke={isSel ? "#F59E0B" : isDep ? "#F59E0B" : b.color} strokeWidth={isSel ? 2 : isDep ? 1.2 : 0.5} style={{ transition: "all 0.25s" }} />
                      <text x={cP.x} y={cP.y + 3.5} textAnchor="middle" fill={isSel || isDep ? "#F1F5F9" : "#CBD5E1"} style={{ fontSize: 7.5, fontWeight: isSel ? 700 : 500, fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.2, pointerEvents: "none" }}>{truncate(c.label, 26)}</text>
                    </g>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Center */}
        <g>
          <circle cx={CX} cy={CY} r={52} fill="#0f172a" stroke="#F59E0B" strokeWidth={2} filter="url(#softGlow)" />
          <circle cx={CX} cy={CY} r={58} fill="none" stroke="#F59E0B" strokeWidth={0.5} opacity={0.3} />
          <text x={CX} y={CY - 12} textAnchor="middle" fill="#F59E0B" style={{ fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5 }}>TRUST &</text>
          <text x={CX} y={CY + 2} textAnchor="middle" fill="#F59E0B" style={{ fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5 }}>TRANSPARENCY</text>
          <text x={CX} y={CY + 16} textAnchor="middle" fill="#94A3B8" style={{ fontSize: 8, fontWeight: 500, fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.5 }}>PROGRAM</text>
        </g>
      </svg>
    </div>
  );
}
