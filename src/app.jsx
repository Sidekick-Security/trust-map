import { useState, useCallback, useEffect, useRef, useMemo } from "react";

const FRAMEWORK = {
  id: "root",
  label: "Trust &\nTransparency\nProgram",
  children: [
    {
      id: "secops", label: "Security\nOperations", color: "#3B82F6", icon: "🛡",
      children: [
        { id: "so1", label: "Threat Prevention", desc: "Threat Prevention establishes the foundational defensive barriers that stop malicious activity before it reaches critical assets. By layering protective controls across networks, endpoints, and data flows, this sub-domain reduces the overall attack surface and ensures that known threat vectors are neutralized proactively.", children: [
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
        { id: "so2", label: "Vulnerability Management", desc: "Vulnerability Management provides a continuous, risk-prioritized process for identifying and remediating weaknesses across the technology estate before adversaries can exploit them. It bridges the gap between discovery and remediation by enforcing SLAs tied to real-world exploitability, ensuring that the most dangerous exposures are addressed first.", children: [
          { label: "Continuous Scanning", desc: "Vulnerability scanning across OS, network, application, container, cloud, and OT environments." },
          { label: "Risk-Based Prioritization (EPSS)", desc: "Using EPSS, CVSS, and business context to prioritize remediation efforts." },
          { label: "Mitigation SLAs", desc: "Defined remediation timelines by severity with escalation for overdue vulnerabilities." },
          { label: "Vulnerability Metrics & Reporting", desc: "Mean time to remediate, scan coverage, aging analysis, and executive dashboards." },
          { label: "Remediation Workflow", desc: "Ticketing integration, remediation assignment, verification scanning, and exception management." },
        ] },
        { id: "so3", label: "Threat Detection & SOC", desc: "Threat Detection & SOC is the central nervous system of security operations, responsible for identifying malicious or anomalous activity in real time across the enterprise. Through continuous monitoring, correlation, and expert-led hunting, the SOC transforms raw telemetry into actionable intelligence that drives rapid response.", children: [
          { label: "SIEM & Log Correlation", desc: "Centralized log management, correlation rules, alerting, and long-term retention." },
          { label: "IDS/IPS", desc: "Network and host-based intrusion detection and prevention with tuned signatures and behavioral rules." },
          { label: "Network Traffic Analysis", desc: "NetFlow, packet capture, east-west traffic visibility, and anomaly detection." },
          { label: "Threat Hunting", desc: "Proactive hypothesis-driven hunting, IOC sweeps, and behavioral analytics." },
          { label: "Insider Threat Detection", desc: "User behavior analytics, privileged user monitoring, and anomalous access detection." },
          { label: "SOC Operations & Staffing", desc: "SOC structure, shift coverage, analyst tiers, runbooks, and performance metrics." },
          { label: "ISAC Partnerships", desc: "Information sharing and analysis center memberships, threat sharing, and sector coordination." },
        ] },
        { id: "so4", label: "Offensive Security", desc: "Offensive Security validates defensive controls by simulating real-world adversary tactics, techniques, and procedures against the organization's own environment. Rather than waiting for attackers to find weaknesses, this sub-domain proactively uncovers blind spots in people, processes, and technology.", children: [
          { label: "Penetration Testing", desc: "Scheduled internal and external penetration tests against network, application, and cloud environments with defined scope and rules of engagement." },
          { label: "Red Team Operations", desc: "Adversary-emulation exercises using real-world TTPs mapped to MITRE ATT&CK to test detection and response end-to-end." },
          { label: "Purple Team Exercises", desc: "Collaborative red/blue engagements where offensive findings are immediately shared to tune detection rules and close gaps in real time." },
          { label: "Physical Security Testing", desc: "Authorized physical intrusion assessments of facilities including tailgating, badge cloning, lock bypass, and dumpster diving." },
          { label: "Social Engineering Assessments", desc: "Phishing, vishing, pretexting, and baiting campaigns that measure human resilience and validate awareness training effectiveness." },
          { label: "Deception Technologies", desc: "Honeypots, honeytokens, and decoy environments deployed to detect lateral movement and misdirect adversaries." },
        ] },
        { id: "so5", label: "Automation & Orchestration", desc: "Automation & Orchestration accelerates security operations by replacing repetitive manual tasks with machine-speed workflows, reducing mean time to detect and respond. It connects disparate security tools into cohesive, repeatable processes that scale with organizational complexity.", children: [
          { label: "SOAR Playbook Development", desc: "Design, testing, and maintenance of orchestration playbooks that automate triage, enrichment, containment, and ticket creation." },
          { label: "Automated Threat Hunting", desc: "Scheduled and trigger-based hunting queries that sweep for IOCs, behavioral anomalies, and emerging TTPs without manual initiation." },
          { label: "Patching & Remediation Automation", desc: "Automated patch deployment, configuration drift correction, and remediation verification scanning workflows." },
          { label: "Automated Risk Scoring", desc: "Real-time risk score calculation combining vulnerability data, asset criticality, threat intelligence, and business context." },
          { label: "Continuous Compliance Checks", desc: "Automated validation of control configurations against CIS benchmarks, regulatory baselines, and internal policies." },
          { label: "AI/ML-Augmented Detection", desc: "Machine learning models for anomaly detection, alert prioritization, false positive reduction, and behavioral analytics." },
        ] },
        { id: "so6", label: "Threat Intelligence", desc: "Threat Intelligence transforms raw data about adversary behavior, infrastructure, and intent into context that informs defensive decision-making across the organization. By curating and operationalizing intelligence from multiple sources, security teams can anticipate attacks rather than merely react to them.", children: [
          { label: "Threat Intelligence Feeds", desc: "Curated commercial, open-source, and government TI feeds ingested and correlated for actionable intelligence." },
          { label: "IOC Management & Lifecycle", desc: "Ingestion, deduplication, aging, and expiration of indicators of compromise with confidence scoring and source attribution." },
          { label: "Dark Web Monitoring", desc: "Monitoring dark web forums, paste sites, and marketplaces for leaked credentials, data, and threat actor discussions targeting the organization." },
          { label: "Industry-Specific Intelligence", desc: "Sector-tailored threat intelligence from ISACs, industry groups, and peer organizations covering relevant threat actors and TTPs." },
          { label: "TI Platform Integration", desc: "Threat intelligence platform (TIP) integration with SIEM, SOAR, EDR, and firewall for automated IOC enrichment and blocking." },
          { label: "Threat Actor Profiling", desc: "Tracking adversary groups, their capabilities, motivations, infrastructure, and TTPs relevant to the organization's threat model." },
        ] },
        { id: "so7", label: "Digital Forensics", desc: "Digital Forensics ensures the organization can systematically investigate security incidents with the rigor needed to determine root cause, assess impact, and support legal proceedings. Forensic readiness before an incident occurs is what separates a credible investigation from a scramble to recover evidence.", children: [
          { label: "Forensic Readiness Planning", desc: "Pre-incident forensic capability planning including tool deployment, log retention, and evidence source identification." },
          { label: "Evidence Collection & Chain of Custody", desc: "Documented evidence acquisition procedures with integrity hashing, tamper-evident storage, and chain of custody logs." },
          { label: "Memory Forensics", desc: "Volatile memory capture and analysis for malware, credential extraction, process injection, and rootkit detection." },
          { label: "Disk & Storage Forensics", desc: "Dead-box and live imaging of storage media, file system analysis, timeline reconstruction, and deleted data recovery." },
          { label: "Network Forensics", desc: "Full packet capture analysis, NetFlow reconstruction, lateral movement tracing, and exfiltration detection through network artifacts." },
          { label: "E-Discovery Support", desc: "Legal hold implementation, custodian identification, data preservation, and defensible collection supporting litigation or regulatory inquiries." },
        ] },
        { id: "so8", label: "Attack Surface Management", desc: "Attack Surface Management provides continuous visibility into all externally reachable assets, including those the organization may not know it has. As cloud adoption, SaaS sprawl, and shadow IT expand the perimeter, this sub-domain ensures that no exposure goes unmonitored or unmanaged.", children: [
          { label: "External Attack Surface Discovery", desc: "Continuous discovery of internet-facing assets including domains, IPs, certificates, cloud resources, and exposed services." },
          { label: "Shadow IT Detection", desc: "Identification of unsanctioned SaaS, cloud accounts, and infrastructure deployed outside approved procurement and governance channels." },
          { label: "Continuous Exposure Monitoring", desc: "Ongoing monitoring of the external attack surface for misconfigurations, expired certificates, open ports, and newly exposed services." },
          { label: "Internet-Facing Asset Inventory", desc: "Maintained inventory of all externally reachable assets with ownership, criticality, and security posture metadata." },
          { label: "Brand & Impersonation Monitoring", desc: "Detection of domain squatting, phishing sites, fake social media profiles, and brand abuse targeting the organization." },
        ] },
      ],
    },
    {
      id: "incident", label: "Incident Response\n& Disclosure", color: "#EF4444", icon: "📢",
      children: [
        { id: "ir1", label: "IR Capability & Playbooks", desc: "IR Capability & Playbooks ensures that when a security incident occurs, the response is swift, coordinated, and rehearsed rather than improvised under pressure. Well-developed and regularly tested playbooks reduce confusion during high-stress events and establish clear ownership at every stage of response.", children: [
          { label: "Incident Response Plans", desc: "Documented IR plans with roles, escalation paths, and communication templates." },
          { label: "Playbook Development & Testing", desc: "Scenario-specific playbooks (ransomware, data breach, insider threat) with regular testing." },
          { label: "Readiness Assessments", desc: "Periodic IR readiness evaluations against frameworks and lessons learned." },
          { label: "First Responder Training", desc: "Training for initial incident handlers on triage, evidence preservation, and escalation." },
          { label: "Forensic Investigation Capability", desc: "In-house or retainer-based forensic investigation for root cause analysis." },
          { label: "IR Partner Retainers", desc: "Pre-negotiated retainers with IR firms, legal counsel, and crisis communications." },
        ] },
        { id: "ir2", label: "Ransomware Resilience", desc: "Ransomware Resilience prepares the organization to withstand, contain, and recover from ransomware attacks without paying a ransom or suffering prolonged operational disruption. It stress-tests backup integrity, validates containment strategies, and integrates with broader business continuity planning.", children: [
          { label: "Business Impact Analysis", desc: "Identification and financial quantification of critical systems and data most impacted by ransomware encryption." },
          { label: "Containment Strategy", desc: "Pre-planned network isolation, endpoint quarantine, and credential reset procedures to halt ransomware propagation." },
          { label: "Backup Adequacy Testing", desc: "Regular backup restoration testing including immutability verification, air-gapped copies, and recovery time validation." },
          { label: "Ransomware Mock Exercises", desc: "Simulated ransomware scenarios testing detection, containment, communication, and recovery end-to-end." },
          { label: "Machine Integrity Checking", desc: "Post-incident verification that recovered systems are free of persistent backdoors, rootkits, and unauthorized changes." },
          { label: "BC/DR Integration", desc: "Integration of ransomware recovery into broader business continuity and disaster recovery plans with defined RTO/RPO." },
        ] },
        { id: "ir3", label: "Crisis Management", desc: "Crisis Management governs the organizational response when a security incident escalates beyond routine operations into a business-level crisis. It establishes the decision-making structures, escalation paths, and coordination mechanisms that executives need to lead effectively under extreme time pressure.", children: [
          { label: "Crisis Team Activation Protocols", desc: "Defined triggers, escalation thresholds, and mobilization procedures for assembling the cross-functional crisis team." },
          { label: "Executive Decision Frameworks", desc: "Pre-defined decision trees and authority matrices for executives covering containment, disclosure, and business continuity actions." },
          { label: "War Room Procedures", desc: "Physical and virtual war room setup, communication tools, status cadence, and documentation practices during active crises." },
          { label: "Cross-Functional Coordination", desc: "Integration protocols for legal, communications, IT, HR, and business leadership ensuring unified crisis response." },
          { label: "Crisis Communication Templates", desc: "Pre-approved communication templates for internal stakeholders, board, customers, regulators, and media during crisis events." },
        ] },
        { id: "ir4", label: "Stakeholder Communication", desc: "Stakeholder Communication ensures that during and after a security incident, every affected audience receives timely, accurate, and appropriately detailed information. Poor communication erodes trust far more than the incident itself, making disciplined messaging a critical component of incident response.", children: [
          { label: "Tiered Notification Framework", desc: "Structured notification tiers for board, regulators, customers, partners, and employees with defined triggers and timelines." },
          { label: "Media Relations & Press Response", desc: "Pre-established media protocols including holding statements, spokesperson designation, and press inquiry management." },
          { label: "SLA-Driven Disclosure Timelines", desc: "Contractual and regulatory disclosure timelines tracked and enforced with automated reminders and escalation." },
          { label: "Transparent Status Pages", desc: "Real-time public and private status pages communicating incident impact, progress, and resolution to affected stakeholders." },
          { label: "Customer Communication Protocols", desc: "Direct customer notification workflows including impact assessment, personalized messaging, and follow-up commitments." },
        ] },
        { id: "ir5", label: "Regulatory Notification", desc: "Regulatory Notification manages the complex, time-sensitive obligation to report security incidents to regulators across multiple jurisdictions and regulatory frameworks. Missing a notification deadline or filing incomplete disclosures can result in significant fines and enforcement actions that compound the damage of the original incident.", children: [
          { label: "HIPAA Breach Notification", desc: "Individual, media, and HHS notification procedures for breaches of unsecured PHI with 60-day and annual timelines." },
          { label: "GDPR 72-Hour Notification", desc: "Supervisory authority notification within 72 hours and data subject communication for high-risk personal data breaches." },
          { label: "SEC Disclosure Management", desc: "Material cybersecurity incident disclosure via 8-K filings within four business days per SEC rules." },
          { label: "State Attorney General Notification", desc: "Multi-state breach notification tracking for varying thresholds, timelines, and content requirements across jurisdictions." },
          { label: "DORA Incident Reporting", desc: "Initial, intermediate, and final reports to competent authorities for major ICT-related incidents per DORA timelines." },
          { label: "Cross-Jurisdiction Coordination", desc: "Harmonized notification strategy when a single incident triggers obligations across multiple regulatory frameworks and geographies." },
        ] },
        { id: "ir6", label: "Post-Incident Transparency", desc: "Post-Incident Transparency converts the pain of a security incident into lasting organizational improvement by institutionalizing honest analysis and follow-through. Blameless retrospectives and public accountability signal to stakeholders that the organization learns from failures rather than hiding them.", children: [
          { label: "Blameless Retrospectives", desc: "Structured post-incident reviews focused on systemic causes and process improvement rather than individual fault." },
          { label: "Public Postmortems", desc: "Externally published incident analyses demonstrating transparency, root cause understanding, and remediation commitments." },
          { label: "Lessons-Learned Integration", desc: "Formal process for translating retrospective findings into control improvements, runbook updates, and training changes." },
          { label: "Control Gap Remediation", desc: "Tracking and closure of control deficiencies identified during incident response with defined owners and deadlines." },
          { label: "Supply Chain Incident Review", desc: "Post-incident analysis of vendor-triggered events including vendor accountability, contractual gap assessment, and relationship impact." },
        ] },
        { id: "ir7", label: "Tabletop & Simulation", desc: "Tabletop & Simulation builds organizational muscle memory for incident response by rehearsing realistic scenarios in a low-stakes environment before a real crisis hits. These exercises expose gaps in playbooks, communication, and decision-making that are invisible on paper but critical under pressure.", children: [
          { label: "Tabletop Exercises", desc: "Discussion-based walkthroughs of incident scenarios testing decision-making, communication, and coordination without live systems." },
          { label: "Live-Fire Simulations", desc: "Technical exercises on live or mirrored systems including CTF competitions, attack-defense drills, and red team live engagements." },
          { label: "Executive-Level Exercises", desc: "Board and C-suite tabletops focused on strategic decisions — disclosure timing, ransom payment, and business continuity trade-offs." },
          { label: "Cross-Functional Simulations", desc: "Multi-department exercises involving legal, communications, IT, and business leaders exercising coordinated response." },
          { label: "After-Action Reporting", desc: "Documented findings, gap identification, and improvement recommendations from exercises with tracked remediation items." },
          { label: "Exercise Program Management", desc: "Annual exercise calendar, scenario development pipeline, participant tracking, and maturity progression across exercise types." },
        ] },
        { id: "ir8", label: "Vulnerability Disclosure & Bug Bounty", desc: "Vulnerability Disclosure & Bug Bounty creates a structured, trusted channel for external security researchers to report vulnerabilities before they are exploited in the wild. By welcoming and rewarding good-faith research, organizations gain access to a global talent pool that continuously tests their defenses.", children: [
          { label: "Vulnerability Disclosure Policy", desc: "Published coordinated disclosure policy defining scope, safe harbor provisions, response timelines, and communication channels." },
          { label: "Bug Bounty Program Operations", desc: "Managed or self-hosted bug bounty program with defined scope, reward tiers, triage SLAs, and researcher communication." },
          { label: "Security.txt Implementation", desc: "RFC 9116-compliant security.txt published at well-known URI with contact, policy, and preferred language information." },
          { label: "Researcher Relationship Management", desc: "Researcher engagement, recognition programs, hall of fame, and ongoing relationship building with the security research community." },
          { label: "Disclosure SLAs & Tracking", desc: "Defined timelines for acknowledgment, triage, remediation, and public disclosure with tracking and escalation for overdue items." },
        ] },
      ],
    },
    {
      id: "iam", label: "Identity & Access\nManagement", color: "#06B6D4", icon: "🔑",
      children: [
        { id: "ia1", label: "Identity Lifecycle", desc: "Identity Lifecycle governs how user identities are created, modified, and removed in lockstep with HR and business events throughout an employee's or contractor's tenure. Gaps in this process — especially during role changes and offboarding — are among the most common sources of unauthorized access.", children: [
          { label: "User Provisioning & Onboarding", desc: "Automated account creation tied to HR events with role-based access assignment and approval workflows." },
          { label: "Role-Based Access Control (RBAC)", desc: "Role engineering, role hierarchy design, role assignment policies, and periodic role rationalization." },
          { label: "HR System Integration", desc: "Real-time feeds from HRIS for joiner/mover/leaver events driving automated identity lifecycle actions." },
          { label: "Identity Repositories", desc: "Directory services (Active Directory, LDAP, cloud directories) management, synchronization, and hygiene." },
          { label: "Unified Identity Profiles", desc: "Correlated identity records across systems providing a single authoritative view of each user's access." },
          { label: "Deprovisioning & Offboarding", desc: "Timely access revocation upon termination or transfer with verification of complete entitlement removal." },
        ] },
        { id: "ia2", label: "Authentication & MFA", desc: "Authentication & MFA determines how the organization verifies that users are who they claim to be before granting access to systems and data. With credential-based attacks remaining the top initial access vector, strong authentication is the single most impactful control for preventing unauthorized entry.", children: [
          { label: "Multi-Factor Authentication (MFA)", desc: "Enforcement of MFA across all user populations with adaptive step-up based on risk signals." },
          { label: "Passwordless Authentication", desc: "FIDO2/WebAuthn implementation, passkey enrollment, and migration strategy away from password-based auth." },
          { label: "Authenticator App & Token Management", desc: "TOTP/HOTP authenticator provisioning, hardware token lifecycle, and backup authentication methods." },
          { label: "Biometric Authentication", desc: "Fingerprint, facial recognition, and behavioral biometrics with liveness detection and anti-spoofing." },
          { label: "Password Policy & Hygiene", desc: "Password complexity requirements, breach-check integration, rotation policies, and credential stuffing defense." },
          { label: "Authentication Monitoring & Analytics", desc: "Failed login detection, impossible travel alerts, brute-force mitigation, and authentication success metrics." },
        ] },
        { id: "ia3", label: "SSO & Federation", desc: "SSO & Federation simplifies and secures the user authentication experience by allowing a single verified identity to flow across multiple applications and organizational boundaries. It reduces password sprawl, centralizes access policy enforcement, and enables seamless collaboration with partners and customers.", children: [
          { label: "Single Sign-On (SSO)", desc: "Centralized authentication across enterprise applications reducing credential sprawl and improving user experience." },
          { label: "SAML Federation", desc: "SAML 2.0 identity provider and service provider configuration, assertion signing, and metadata management." },
          { label: "OAuth & OpenID Connect", desc: "OAuth 2.0 authorization flows, OIDC token management, scope definitions, and client credential governance." },
          { label: "Cross-Cloud Federation", desc: "Identity federation across multi-cloud environments enabling seamless access to AWS, Azure, and GCP resources." },
          { label: "Customer & Partner SSO", desc: "External-facing SSO for customers and business partners with delegated administration and branding." },
          { label: "Federation Trust Management", desc: "Trust relationship lifecycle, certificate rotation, metadata refresh, and federation audit logging." },
        ] },
        { id: "ia4", label: "Privileged Access (PAM)", desc: "Privileged Access (PAM) protects the most powerful credentials in the environment — those that can alter configurations, access sensitive data, and disable security controls. Compromised privileged accounts are involved in nearly every major breach, making their protection a top-tier security priority.", children: [
          { label: "Privileged Account Discovery & Vaulting", desc: "Automated discovery of privileged accounts and credential vaulting with check-out/check-in workflows." },
          { label: "Just-in-Time (JIT) Access", desc: "Time-bound privilege elevation with approval workflows, automatic expiration, and audit trails." },
          { label: "Session Recording & Monitoring", desc: "Real-time privileged session recording, keystroke logging, command filtering, and session replay for audit." },
          { label: "Break-Glass Procedures", desc: "Emergency access protocols with dual-authorization, post-use review, and automatic credential rotation." },
          { label: "Service Account Governance", desc: "Service account inventory, ownership assignment, password rotation, and usage monitoring." },
          { label: "Privilege Escalation Prevention", desc: "Least-privilege enforcement, standing privilege reduction, and detection of unauthorized elevation attempts." },
        ] },
        { id: "ia5", label: "Zero Trust Identity", desc: "Zero Trust Identity shifts access decisions from a one-time gate at login to a continuous evaluation of user behavior, device health, and contextual risk signals. It operationalizes the principle of \"never trust, always verify\" by treating every access request as potentially hostile until proven otherwise.", children: [
          { label: "Continuous Authentication", desc: "Ongoing session validation using behavioral signals, re-authentication triggers, and session risk scoring." },
          { label: "Context-Aware Access Policies", desc: "Access decisions incorporating device posture, location, time, network, and user risk score as inputs." },
          { label: "Identity Threat Detection & Response (ITDR)", desc: "Detection of identity-based attacks including credential theft, token replay, and MFA fatigue." },
          { label: "Device Trust Signals", desc: "Endpoint compliance verification, certificate-based device identity, and posture assessment as access conditions." },
          { label: "Micro-Segmented Identity", desc: "Per-application and per-resource access policies replacing network-level trust with identity-level trust." },
          { label: "Conditional Access Policies", desc: "Dynamic policy enforcement combining user risk, device compliance, and application sensitivity for access decisions." },
        ] },
        { id: "ia6", label: "Identity Governance (IGA)", desc: "Identity Governance (IGA) provides ongoing assurance that access rights remain appropriate, compliant, and aligned with the principle of least privilege over time. Without active governance, access accumulates silently as people change roles, creating toxic permission combinations and compliance violations.", children: [
          { label: "Access Certification Campaigns", desc: "Periodic manager and application-owner reviews of user entitlements with attestation and revocation workflows." },
          { label: "Separation of Duties (SoD)", desc: "SoD policy definition, conflict detection, preventive enforcement, and detective monitoring for violations." },
          { label: "Role Mining & Engineering", desc: "Automated analysis of existing access patterns to define, optimize, and rationalize RBAC role structures." },
          { label: "Entitlement Reviews", desc: "Fine-grained permission reviews beyond role-level, covering application entitlements and data access rights." },
          { label: "Orphaned Account Detection", desc: "Automated identification of accounts without valid owners due to termination, transfer, or system decommission." },
          { label: "Access Request & Approval Workflows", desc: "Self-service access request portals with risk-based approval routing and fulfillment automation." },
        ] },
        { id: "ia7", label: "Non-Human Identities", desc: "Non-Human Identities addresses the rapidly growing population of service accounts, API keys, machine credentials, and workload identities that operate without human oversight. These identities often carry elevated privileges and are prime targets for attackers because they are frequently unmonitored and rarely rotated.", children: [
          { label: "Service Account Management", desc: "Inventory, ownership assignment, privilege scoping, and lifecycle management for service accounts." },
          { label: "API Key Governance", desc: "API key issuance, rotation schedules, usage monitoring, scope limitation, and revocation procedures." },
          { label: "Machine Identity & Certificates", desc: "X.509 certificate lifecycle management, automated issuance/renewal, and certificate authority governance." },
          { label: "Workload Identity Federation", desc: "Cloud-native workload identity using SPIFFE/SPIRE, managed identities, and cross-cloud trust relationships." },
          { label: "Secrets Rotation & Hygiene", desc: "Automated credential rotation, secrets sprawl detection, and vault integration for all non-human credentials." },
          { label: "Non-Human Identity Inventory", desc: "Comprehensive discovery and cataloging of all machine identities, bots, and automated accounts across environments." },
        ] },
        { id: "ia8", label: "Customer Identity (CIAM)", desc: "Customer Identity (CIAM) manages how external customers authenticate, register, and interact with the organization's digital services in a secure and frictionless manner. It directly impacts revenue by balancing account security with conversion rates and user experience.", children: [
          { label: "Customer Registration & Onboarding", desc: "Frictionless registration flows with identity verification, email/phone validation, and progressive data collection." },
          { label: "Social Login & External Identity Providers", desc: "Integration with social identity providers (Google, Apple, Microsoft) with account linking and deduplication." },
          { label: "Progressive Profiling", desc: "Incremental data collection across sessions to build customer profiles without overwhelming initial registration." },
          { label: "Consent-Aware Identity", desc: "Consent capture at registration and profile updates, preference centers, and consent-gated data access." },
          { label: "Account Takeover Protection", desc: "Credential stuffing defense, anomalous login detection, device fingerprinting, and account recovery security." },
          { label: "Customer Self-Service", desc: "Password reset, MFA enrollment, profile management, and session management portals for customers." },
        ] },
      ],
    },
    {
      id: "governance", label: "Governance\n& Strategy", color: "#8B5CF6", icon: "⚖",
      children: [
        { id: "gv1", label: "Strategy & Alignment", desc: "Strategy & Alignment ensures that the security program is driven by business objectives rather than operating as an isolated technical function. By mapping security investments to corporate goals and maintaining a forward-looking roadmap, this sub-domain keeps leadership informed and supportive.", children: [
          { label: "Security Vision & Mission", desc: "Defined security vision statement and mission aligned with corporate purpose and values." },
          { label: "Strategic Roadmap (1-3 Year)", desc: "Multi-year security roadmap with milestones, dependencies, and alignment to corporate strategic planning cycles." },
          { label: "Business Objective Mapping", desc: "Explicit mapping of security initiatives to business objectives demonstrating security as a business enabler." },
          { label: "Benchmarking & Peer Comparison", desc: "Industry benchmarking of security capabilities, spending, and maturity against peers and sector leaders." },
          { label: "Team Planning & Resource Strategy", desc: "Workforce planning, capability gap identification, and resourcing strategy to execute the security roadmap." },
          { label: "Stakeholder Expectations Management", desc: "Regular management updates, expectation alignment sessions, and transparent progress reporting against commitments." },
        ] },
        { id: "gv2", label: "Frameworks & Standards", desc: "Frameworks & Standards provides the structured foundation that organizations use to build, measure, and communicate their security programs against recognized industry benchmarks. Adopting established frameworks reduces ambiguity, accelerates compliance across multiple regulatory regimes, and creates a common language between security, audit, and business teams.", children: [
          { label: "Framework Selection & Adoption", desc: "Evaluation and selection of applicable security frameworks based on regulatory requirements and business context." },
          { label: "Control Mapping & Harmonization", desc: "Cross-framework control mapping to eliminate redundancy and identify gaps across overlapping requirements." },
          { label: "Framework-to-Industry Alignment", desc: "Mapping framework controls to industry-specific regulations (HIPAA, PCI DSS, DORA) for sector compliance." },
          { label: "Control Library Management", desc: "Centralized control catalog with ownership, implementation status, and evidence linkage across all adopted frameworks." },
          { label: "Framework Gap Analysis", desc: "Periodic assessment of control implementation against framework requirements to identify coverage gaps." },
          { label: "Multi-Regulatory Visibility", desc: "Unified dashboards showing compliance posture across all frameworks for organizations in multi-regulatory environments." },
        ] },
        { id: "gv3", label: "Policies & RACI", desc: "Policies & RACI translates security strategy into enforceable, clearly owned operational expectations that every part of the organization can follow. Well-maintained policies with explicit accountability prevent the ambiguity that leads to security gaps and audit findings.", children: [
          { label: "Policy Lifecycle Management", desc: "Policy creation, review, approval, publication, and retirement with version control and change tracking." },
          { label: "Security Standards & Guidelines", desc: "Detailed technical standards and implementation guidelines that translate policies into actionable requirements." },
          { label: "RACI & Responsibility Assignment", desc: "Defined roles and responsibilities (RACI) for security functions, data ownership, and control operation." },
          { label: "Exception Management", desc: "Formal risk-acceptance process for policy exceptions with time-bound approvals and compensating controls." },
          { label: "Data Ownership Definitions", desc: "Assignment of data owners, custodians, and stewards with defined responsibilities for classification and access." },
          { label: "Policy Communication & Acknowledgment", desc: "Distribution of policies to relevant audiences with read acknowledgment tracking and comprehension validation." },
        ] },
        { id: "gv4", label: "Metrics & Board Reporting", desc: "Metrics & Board Reporting quantifies security program performance in terms that executives and board members can use to make informed risk decisions. It moves the conversation beyond anecdotal status updates to data-driven insights on control effectiveness, risk reduction, and return on security investment.", children: [
          { label: "Operational Security Metrics", desc: "KPIs/KRIs for day-to-day security operations including MTTD, MTTR, patching cadence, and alert volumes." },
          { label: "Executive Dashboards", desc: "Board-ready visualizations translating technical metrics into business risk language and trend analysis." },
          { label: "Control Effectiveness Measurement", desc: "Quantitative assessment of control performance against design intent with pass/fail rates and coverage metrics." },
          { label: "Risk Reduction Tracking", desc: "Measurement of risk posture improvement over time correlated to security investments and initiatives." },
          { label: "Return on Security Investment (ROSI)", desc: "Financial analysis demonstrating security investment value through avoided losses and risk reduction quantification." },
          { label: "Security Debt Quantification", desc: "Tracking accumulated security technical debt with prioritized remediation plans and business impact estimates." },
        ] },
        { id: "gv5", label: "Trust as Corporate Value", desc: "Trust as Corporate Value elevates security and transparency from a compliance obligation to a strategic business differentiator that strengthens customer and partner relationships. By publicly committing to trust principles and measuring against them, the organization signals that security is embedded in its brand identity.", children: [
          { label: "Transparency Commitments", desc: "Publicly stated transparency principles for security practices, incident handling, and data stewardship." },
          { label: "Trust Reporting & Scorecards", desc: "Published trust metrics, security posture summaries, and compliance attestation reports for stakeholders." },
          { label: "Security as Business Differentiator", desc: "Positioning security certifications and practices as competitive advantages in sales and partnership discussions." },
          { label: "Trust Brand Building", desc: "Marketing security posture through trust centers, security pages, and customer-facing assurance programs." },
          { label: "External Trust Communication", desc: "Proactive communication of security investments, incident response capabilities, and data protection practices." },
        ] },
        { id: "gv6", label: "Security Committee & Charter", desc: "Security Committee & Charter formalizes the cross-functional governance body responsible for security oversight, decision-making authority, and strategic direction. Without a clearly chartered committee with the right representation and meeting cadence, security decisions are made ad hoc and lack organizational weight.", children: [
          { label: "Committee Structure & Composition", desc: "Cross-functional membership from security, IT, legal, business, risk, and executive leadership." },
          { label: "Charter & Decision Authority", desc: "Documented charter defining scope, decision rights, escalation authority, and accountability." },
          { label: "Meeting Cadence & Agenda Management", desc: "Regular meeting schedule with structured agendas covering risk posture, investment decisions, and policy approvals." },
          { label: "Cross-Functional Representation", desc: "Ensuring business unit, legal, HR, finance, and technology voices are represented in security governance decisions." },
          { label: "Committee Effectiveness Review", desc: "Periodic assessment of committee impact, decision quality, attendance, and action item completion rates." },
        ] },
        { id: "gv7", label: "Regulatory Intelligence", desc: "Regulatory Intelligence keeps the organization ahead of the rapidly evolving regulatory landscape by systematically tracking, assessing, and preparing for new and changing compliance obligations. Reactive compliance is expensive and risky; proactive intelligence allows the organization to adapt to regulatory shifts on its own timeline.", children: [
          { label: "Regulatory Horizon Scanning", desc: "Systematic monitoring of proposed legislation, regulatory guidance, and enforcement trends across relevant jurisdictions." },
          { label: "Impact Assessment & Gap Analysis", desc: "Evaluating new regulatory requirements against current capabilities to identify compliance gaps and resource needs." },
          { label: "Compliance Roadmap Development", desc: "Planning and sequencing compliance activities ahead of enforcement deadlines with resource allocation and milestones." },
          { label: "Legislative & Rule Tracking", desc: "Tracking bills, final rules, enforcement actions, and guidance documents through regulatory lifecycle stages." },
          { label: "Proactive Regulatory Engagement", desc: "Participation in industry comment periods, regulatory working groups, and government advisory committees." },
        ] },
        { id: "gv8", label: "Program Maturity Assessment", desc: "Program Maturity Assessment provides an objective, repeatable method for evaluating where the security program stands relative to industry benchmarks and where investment will yield the greatest improvement. It replaces subjective confidence with structured evidence of capability gaps and progress over time.", children: [
          { label: "Maturity Model Selection & Application", desc: "Selecting and applying maturity models (CMM, C2M2, NIST CSF tiers) to assess security program capability levels." },
          { label: "Capability Gap Analysis", desc: "Identifying gaps between current maturity and target state across security domains with prioritized remediation." },
          { label: "Peer & Industry Benchmarking", desc: "Comparing security program maturity against industry peers, sector averages, and best-in-class organizations." },
          { label: "Continuous Improvement Planning", desc: "Structured improvement roadmap with measurable milestones tied to maturity level advancement." },
          { label: "Independent Maturity Assessment", desc: "Third-party assessments providing objective evaluation of security program maturity and credibility with stakeholders." },
        ] },
        { id: "gv9", label: "Governance-as-Code", desc: "Governance-as-Code embeds policy enforcement directly into development and deployment pipelines, ensuring that governance decisions are applied consistently and automatically at machine speed. It eliminates the drift between documented policies and actual technical controls that plagues manual compliance processes.", children: [
          { label: "Policy-as-Code Authoring", desc: "Translating security policies into machine-readable formats (OPA/Rego, Sentinel, CUE) with version control." },
          { label: "Pipeline Policy Enforcement", desc: "Automated policy gates in CI/CD pipelines blocking non-compliant deployments and configurations." },
          { label: "Automated Compliance Verification", desc: "Continuous compliance scanning against codified policies with drift detection and remediation triggers." },
          { label: "Cloud Policy Engines", desc: "Leveraging native cloud policy services (AWS Config, Azure Policy, GCP Org Policies) for governance enforcement." },
          { label: "Policy Code Testing & Validation", desc: "Unit testing and integration testing of policy-as-code to ensure rules accurately reflect intended governance." },
        ] },
        { id: "gv10", label: "Security Evangelism", desc: "Security Evangelism builds the internal awareness and cultural buy-in needed to make security a shared organizational responsibility rather than the sole burden of the security team. Through targeted communication and stakeholder engagement, it ensures that security priorities are understood, valued, and supported across every business function.", children: [
          { label: "Internal Security Marketing", desc: "Branded security campaigns, newsletters, intranet content, and gamification to maintain engagement beyond formal training." },
          { label: "Stakeholder Awareness Campaigns", desc: "Targeted campaigns for specific audiences (executives, developers, business units) with relevant security messaging." },
          { label: "Security Value Communication", desc: "Articulating how security enables business outcomes, protects revenue, and creates competitive advantage." },
          { label: "Executive Briefing Programs", desc: "Regular executive-tailored briefings on threat landscape, risk posture, and strategic security initiatives." },
          { label: "Culture-Building Initiatives", desc: "Security days, hackathons, recognition programs, and community-building activities that embed security into culture." },
        ] },
      ],
    },
    {
      id: "risk", label: "Risk Management\n& Compliance", color: "#A855F7", icon: "📊",
      children: [
        { id: "rm1", label: "Risk Assessment & CRQ", desc: "Risk Assessment & CRQ provides the quantitative foundation for security decision-making by translating cyber threats into financial and operational terms the business understands. It ensures risks are systematically identified, measured using industry-accepted methodologies, and tracked in a centralized register so leadership can prioritize investments based on actual exposure.", children: [
          { label: "Ongoing Risk Assessments", desc: "Regular risk assessment cycles with defined scope, methodology, and reporting." },
          { label: "Cyber Risk Quantification (CRQ)", desc: "Financial quantification of cyber risk using models like FAIR for executive communication." },
          { label: "FAIR Methodology", desc: "Factor Analysis of Information Risk implementation for consistent risk measurement." },
          { label: "Centralized Risk Register", desc: "Single source of truth for all identified risks with owners, ratings, and treatment plans." },
          { label: "Risk Scenario Modeling", desc: "Modeling specific threat scenarios with likelihood and impact projections." },
          { label: "Pen Test Integration", desc: "Incorporating penetration testing results into risk assessments and register updates." },
        ] },
        { id: "rm2", label: "Compliance & Audits", desc: "Compliance & Audits ensures the organization meets its obligations across an increasingly complex web of regulatory frameworks and industry standards. A mature compliance function reduces legal exposure, avoids costly penalties, and provides independent assurance to the board, regulators, and customers that security controls are operating as intended.", children: [
          { label: "Control Monitoring & Testing", desc: "Ongoing monitoring of security controls against regulatory requirements with defined testing schedules and pass/fail criteria." },
          { label: "Evidence Collection & Management", desc: "Systematic collection, organization, and retention of audit evidence across control domains with chain-of-custody tracking." },
          { label: "Audit Planning & Management", desc: "Internal and external audit coordination, scoping, scheduling, resource allocation, and auditor relationship management." },
          { label: "Findings & Remediation Tracking", desc: "Tracking audit findings, corrective action plans, POA&M management, and remediation verification through closure." },
          { label: "Regulatory Change Management", desc: "Monitoring regulatory changes, assessing impact on existing controls, and updating compliance programs accordingly." },
          { label: "Cross-Framework Mapping", desc: "Mapping controls across multiple frameworks (NIST, PCI, HIPAA, SOX) to reduce duplication and streamline evidence collection." },
        ] },
        { id: "rm3", label: "Legal & Data Governance", desc: "Legal & Data Governance establishes the legal and policy scaffolding that determines how data is owned, protected, retained, and ultimately disposed of across the enterprise. It bridges the gap between security operations and legal obligations, ensuring the organization can respond to investigations, enforce contracts, and prevent data loss.", children: [
          { label: "Data Discovery & Ownership", desc: "Identifying data repositories, assigning data owners, and maintaining a data inventory across the organization." },
          { label: "Vendor Contract Security", desc: "Security and data protection clauses in vendor agreements, BAAs, DPAs, and right-to-audit provisions." },
          { label: "Legal Investigations & Forensics", desc: "Coordinating forensic investigations with legal counsel, preserving attorney-client privilege, and managing legal holds." },
          { label: "Data Retention & Destruction", desc: "Retention schedule management, secure destruction methods, certificate of destruction, and regulatory retention compliance." },
          { label: "Regulatory Interpretation & Guidance", desc: "Legal analysis of regulatory obligations, enforcement trends, and translating legal requirements into security controls." },
          { label: "eDiscovery Readiness", desc: "Processes and technology for litigation hold, data preservation, collection, and production in response to legal proceedings." },
        ] },
        { id: "rm4", label: "OT & Physical Security", desc: "OT & Physical Security addresses the unique risk landscape where cyber threats can produce physical consequences — disrupting manufacturing lines, critical infrastructure, or building systems. As IT and OT networks converge and IoT devices proliferate, this sub-domain ensures that industrial environments receive purpose-built security controls.", children: [
          { label: "ICS/SCADA Security", desc: "Securing programmable logic controllers, SCADA systems, HMIs, and distributed control systems against cyber threats." },
          { label: "OT Risk Assessment", desc: "Risk assessments specific to operational technology environments accounting for safety, availability, and process integrity." },
          { label: "Physical Access Controls", desc: "Badge systems, biometric access, visitor management, surveillance, and physical security monitoring." },
          { label: "IT/OT Convergence Security", desc: "Managing the security boundary between IT and OT networks including segmentation, data diodes, and protocol translation." },
          { label: "Environmental Controls", desc: "HVAC monitoring, fire suppression, water detection, power redundancy, and environmental threat protection for critical infrastructure." },
          { label: "OT Asset Inventory & Monitoring", desc: "Passive discovery and inventory of OT assets with network monitoring tailored to industrial protocols." },
        ] },
        { id: "rm5", label: "Cyber Risk Insurance", desc: "Cyber Risk Insurance serves as a financial backstop that transfers residual risk the organization chooses not to absorb or mitigate through technical controls. It requires rigorous evaluation of policy terms, coverage gaps, and claims processes to ensure the organization can actually recover financially when a significant incident occurs.", children: [
          { label: "Coverage Evaluation & Gap Analysis", desc: "Assessing cyber insurance policy coverage against organizational risk profile and identifying coverage gaps." },
          { label: "Policy Adequacy & Limits", desc: "Evaluating coverage limits, sub-limits, deductibles, and retention levels against quantified cyber risk exposure." },
          { label: "Claims Readiness & Process", desc: "Documented claims procedures, evidence preservation requirements, carrier notification timelines, and breach counsel panel access." },
          { label: "Underwriting Preparation", desc: "Preparing security posture documentation, control evidence, and maturity assessments for insurance underwriting and renewals." },
          { label: "Ransomware & Extortion Coverage", desc: "Evaluating ransomware-specific coverage, extortion payment provisions, business interruption, and restoration cost coverage." },
        ] },
        { id: "rm6", label: "Risk Appetite & Tolerance", desc: "Risk Appetite & Tolerance translates the board's strategic intent into actionable boundaries that guide day-to-day security decisions across the enterprise. By defining how much risk is acceptable and when escalation is required, it prevents both excessive caution that stalls the business and unchecked risk-taking that endangers it.", children: [
          { label: "Risk Appetite Statement", desc: "Board-approved statement defining the types and levels of risk the organization is willing to accept in pursuit of objectives." },
          { label: "Tolerance Thresholds & Metrics", desc: "Quantified risk tolerance levels by category with measurable thresholds that trigger management action." },
          { label: "Risk Acceptance Criteria", desc: "Defined criteria and authority levels for formally accepting residual risks including documentation requirements." },
          { label: "Escalation Triggers & Protocols", desc: "Defined thresholds that trigger escalation to senior management or the board when risk levels approach or exceed tolerance." },
          { label: "Risk Appetite Alignment Reviews", desc: "Periodic reviews ensuring risk appetite remains aligned with business strategy, threat landscape, and regulatory changes." },
        ] },
        { id: "rm7", label: "Control Assurance", desc: "Control Assurance validates that the security controls the organization has invested in are actually working as designed, not just deployed. Through systematic testing, continuous monitoring, and evidence collection, it closes the gap between documented policies and real-world effectiveness.", children: [
          { label: "Control Testing Programs", desc: "Structured programs for testing control design and operating effectiveness on a risk-based schedule." },
          { label: "Effectiveness Measurement", desc: "Quantitative metrics for control performance including failure rates, coverage gaps, and mean time to detect control degradation." },
          { label: "Continuous Control Monitoring", desc: "Automated monitoring of control state using telemetry, configuration checks, and real-time alerting on control drift." },
          { label: "Automated Evidence Collection", desc: "Tooling to automatically collect, timestamp, and store control evidence reducing manual audit preparation burden." },
          { label: "Control Gap Remediation", desc: "Workflows for identifying control deficiencies, assigning remediation owners, tracking closure, and verifying effectiveness." },
        ] },
        { id: "rm8", label: "Regulatory Examination Readiness", desc: "Regulatory Examination Readiness prepares the organization to withstand scrutiny from regulators and examiners with confidence rather than scrambling when notice arrives. It maintains a state of continuous preparedness through organized evidence, strong examiner relationships, and disciplined tracking of prior findings.", children: [
          { label: "Examiner Relationship Management", desc: "Proactive engagement with regulatory examiners, pre-examination briefings, and ongoing communication cadence." },
          { label: "Evidence Preparation & Organization", desc: "Pre-staging examination evidence, document repositories, and response packages organized by regulatory domain." },
          { label: "Finding Remediation Tracking", desc: "Tracking examination findings, matters requiring attention (MRAs), and corrective actions through validated closure." },
          { label: "Consent Order & Enforcement Management", desc: "Managing regulatory enforcement actions, consent order obligations, progress reporting, and remediation milestones." },
          { label: "Examination Simulation & Readiness", desc: "Mock examinations, readiness assessments, and dry runs to identify gaps before actual regulatory examinations." },
        ] },
      ],
    },
    {
      id: "secarch", label: "Security\nArchitecture", color: "#0EA5E9", icon: "🏗",
      children: [
        { id: "sa1", label: "Zero Trust & SASE", desc: "Zero Trust & SASE redefines the security perimeter around identity and data rather than network location, reflecting the reality that users, devices, and workloads now operate everywhere. This architectural shift eliminates implicit trust and enforces continuous verification, enabling secure access regardless of where the user or resource resides.", children: [
          { label: "Zero Trust Roadmap & Maturity", desc: "Multi-year zero trust adoption roadmap with maturity milestones, pilot programs, and phased enforcement rollout." },
          { label: "SASE/SSE Architecture", desc: "Secure access service edge design combining network security and WAN capabilities delivered as a cloud service." },
          { label: "Micro-Segmentation", desc: "Granular network segmentation policies limiting lateral movement based on identity, workload, and data sensitivity." },
          { label: "Software-Defined Networking", desc: "SDN-based security policy enforcement, programmable network controls, and centralized policy management." },
          { label: "Secure Enclaves & Isolation", desc: "Hardware and software-based isolation for sensitive workloads including TEEs, confidential computing, and enclave design." },
          { label: "Policy Enforcement Points", desc: "Deployment strategy for policy decision and enforcement points across users, devices, workloads, and data flows." },
        ] },
        { id: "sa2", label: "Defense-in-Depth", desc: "Defense-in-Depth ensures that no single control failure results in a complete security breakdown by layering complementary protections across the network, application, and data tiers. This time-tested architectural principle forces adversaries to overcome multiple independent barriers, dramatically increasing the cost and difficulty of a successful attack.", children: [
          { label: "Network Segmentation & Zones", desc: "Tiered network architecture with DMZs, VLANs, and security zones isolating systems by sensitivity and function." },
          { label: "Application Layer Protection", desc: "Layered application security controls including WAFs, RASP, API gateways, and application-aware firewalls." },
          { label: "Remote Access Architecture", desc: "Secure remote access design including VPN, ZTNA, jump servers, and session management for distributed workforces." },
          { label: "Encryption Architecture", desc: "End-to-end encryption strategy covering data in transit, at rest, and in use with standards for algorithm selection." },
          { label: "Network Function Virtualization", desc: "Virtualized security functions including virtual firewalls, IDS/IPS, and load balancers for elastic security scaling." },
        ] },
        { id: "sa3", label: "Cloud & Hybrid Architecture", desc: "Cloud & Hybrid Architecture provides the security blueprint for workloads distributed across multiple cloud providers, on-premises data centers, and hybrid environments. It addresses the fundamental challenge of maintaining consistent security posture and visibility when infrastructure is ephemeral, API-driven, and managed under shared responsibility models.", children: [
          { label: "Multi-Cloud Security Patterns", desc: "Consistent security architecture across AWS, Azure, GCP, and private cloud with unified policy enforcement." },
          { label: "Container & Kubernetes Security", desc: "Container image hardening, runtime security, pod security policies, admission controllers, and registry scanning." },
          { label: "Cloud Security Posture Management", desc: "CSPM tooling for continuous assessment of cloud configurations against security baselines and compliance benchmarks." },
          { label: "Serverless Security Architecture", desc: "Security patterns for serverless functions including least-privilege IAM roles, cold-start protections, and execution monitoring." },
          { label: "Service Mesh Security", desc: "Mutual TLS between services, service-to-service authorization, traffic encryption, and observability within the mesh." },
          { label: "Cloud Identity & Entitlement", desc: "CIEM for managing cloud IAM permissions, detecting over-privileged identities, and enforcing least privilege across clouds." },
        ] },
        { id: "sa4", label: "Secure Design Review", desc: "Secure Design Review embeds security thinking at the earliest and most cost-effective stage of the development lifecycle — before a single line of code is written. By evaluating architectures against known threat patterns and proven design principles, it prevents entire categories of vulnerabilities from reaching production.", children: [
          { label: "Architecture Review Board", desc: "Formal review process for new systems and significant changes with security architecture sign-off requirements." },
          { label: "Security Design Patterns", desc: "Reusable secure design patterns and anti-patterns catalog for common architectural decisions." },
          { label: "Reference Architectures", desc: "Pre-approved reference architectures for common deployment patterns embedding security controls by default." },
          { label: "Design-Phase Threat Modeling", desc: "Threat modeling during architecture and design phases using STRIDE, PASTA, or attack trees before implementation." },
          { label: "Security Requirements Definition", desc: "Translating security policies and standards into specific technical requirements for system design and procurement." },
        ] },
        { id: "sa5", label: "Resilient Design", desc: "Resilient Design ensures that critical systems can withstand disruption, degrade gracefully, and recover rapidly whether the cause is a cyberattack, infrastructure failure, or natural disaster. It builds survivability directly into the architecture rather than relying solely on reactive recovery procedures.", children: [
          { label: "Backup & Replication Architecture", desc: "Backup strategies including immutable backups, air-gapped copies, replication topologies, and retention policies." },
          { label: "Multi-Site & Failover Design", desc: "Active-active and active-passive site architectures with automated failover, DNS-based routing, and geographic redundancy." },
          { label: "Disaster Recovery Posture", desc: "DR architecture aligned to RTO/RPO requirements with documented runbooks and regular recovery testing." },
          { label: "Infrastructure-as-Code Security", desc: "Security scanning of IaC templates, drift detection, policy-as-code enforcement, and immutable infrastructure patterns." },
          { label: "Chaos Engineering", desc: "Controlled fault injection to validate resilience, identify failure modes, and verify recovery automation works under stress." },
        ] },
        { id: "sa6", label: "Data Security Architecture", desc: "Data Security Architecture provides the technical controls that protect sensitive information regardless of where it resides or how it moves through the enterprise. It ensures that even if perimeter and application defenses are bypassed, the data itself remains unintelligible and unusable to unauthorized parties.", children: [
          { label: "Encryption at Rest & In Transit", desc: "Standards and architecture for encrypting stored data and network communications with approved algorithms and key lengths." },
          { label: "Tokenization & Data Masking", desc: "Token vault architecture, format-preserving tokenization, dynamic data masking, and de-identification for non-production environments." },
          { label: "Key Management Infrastructure", desc: "HSM deployment, key lifecycle management, key rotation automation, and centralized key management across environments." },
          { label: "Database Security", desc: "Database activity monitoring, access controls, query auditing, encryption, and privileged database user management." },
          { label: "Data-Centric Security Architecture", desc: "Security controls that travel with data regardless of location including rights management, labeling, and persistent protection." },
        ] },
        { id: "sa7", label: "Network Security Architecture", desc: "Network Security Architecture defines how traffic is controlled, inspected, and segmented across the enterprise to limit an attacker's ability to move laterally after initial compromise. A well-designed network security architecture constrains blast radius, enforces policy at every boundary, and provides the visibility needed to detect threats in transit.", children: [
          { label: "Firewall Architecture & Management", desc: "Firewall deployment topology, rule lifecycle management, change control, and next-generation firewall capability planning." },
          { label: "DNS Security Design", desc: "DNSSEC implementation, DNS filtering, protective DNS services, and DNS-over-HTTPS/TLS architecture." },
          { label: "East-West Traffic Inspection", desc: "Internal network traffic visibility, lateral movement detection, and inspection points between trust zones." },
          { label: "Network Access Control", desc: "802.1X authentication, device posture assessment, dynamic VLAN assignment, and network quarantine for non-compliant devices." },
          { label: "SD-WAN Security Architecture", desc: "Secure SD-WAN design with integrated security services, traffic encryption, and centralized policy orchestration." },
          { label: "Network Monitoring & Visibility", desc: "Full packet capture strategy, NetFlow/IPFIX collection, traffic analysis platforms, and encrypted traffic inspection." },
        ] },
        { id: "sa8", label: "Endpoint Architecture", desc: "Endpoint Architecture establishes the security posture for every device that touches corporate data — from managed workstations to mobile phones and browsers. As endpoints remain the most common initial attack vector, this sub-domain ensures consistent detection, response, and hardening standards across a diverse and distributed device fleet.", children: [
          { label: "EDR/XDR Strategy", desc: "Endpoint detection and response platform selection, extended detection across endpoints/network/cloud, and telemetry integration." },
          { label: "Endpoint Hardening Standards", desc: "CIS benchmark implementation, OS hardening baselines, application whitelisting, and removable media controls." },
          { label: "Mobile Device Architecture", desc: "MDM/UEM platform design, containerization for BYOD, mobile app vetting, and device compliance enforcement." },
          { label: "Browser Isolation", desc: "Remote browser isolation for high-risk web activity, web content rendering in sandboxed environments, and browser security policies." },
          { label: "Endpoint Lifecycle Management", desc: "Device provisioning, patch compliance, end-of-life planning, secure decommissioning, and fleet health monitoring." },
        ] },
      ],
    },
    {
      id: "ai", label: "AI Governance\n& Responsible AI", color: "#F59E0B", icon: "🤖",
      children: [
        { id: "ai1", label: "AI Governance & Policy", desc: "AI Governance & Policy establishes the organizational framework, policies, and oversight structures needed to deploy AI responsibly and at scale. It ensures that AI adoption is guided by clear accountability, transparency requirements, and alignment with emerging standards so the organization can innovate without creating ungoverned risk.", children: [
          { label: "AI Governance Framework", desc: "Organizational AI governance structure with defined roles, decision authority, and oversight committees aligned to NIST AI RMF." },
          { label: "AI Policies & Acceptable Use", desc: "Enterprise AI policies covering acceptable use, data handling in AI systems, prohibited use cases, and GenAI-specific guidelines." },
          { label: "AI Transparency Requirements", desc: "Disclosure obligations for AI-driven decisions, model documentation standards, and customer-facing AI transparency commitments." },
          { label: "LLM & Foundation Model Oversight", desc: "Governance controls specific to large language models including prompt governance, output review, and model selection criteria." },
          { label: "AI Regulatory Compliance", desc: "Mapping AI activities to EU AI Act, NIST AI RMF, state AI laws, and sector-specific AI requirements." },
          { label: "AI Risk Tolerance & Appetite", desc: "Board-approved AI risk appetite statement defining acceptable AI use categories, autonomy thresholds, and escalation triggers." },
        ] },
        { id: "ai2", label: "Responsible AI & Ethics", desc: "Responsible AI & Ethics ensures that AI systems operate fairly, transparently, and in alignment with the organization's values and societal expectations. It addresses the unique risks of algorithmic decision-making — bias, opacity, and unintended harm — by embedding ethical safeguards and human oversight into the AI lifecycle.", children: [
          { label: "Algorithmic Bias Testing", desc: "Systematic testing for demographic bias, disparate impact analysis, and bias mitigation across model lifecycle." },
          { label: "Fairness Metrics & Monitoring", desc: "Defined fairness metrics (equalized odds, demographic parity), continuous monitoring, and threshold-based alerting." },
          { label: "Explainability & Interpretability", desc: "Model explainability techniques (SHAP, LIME), decision audit trails, and user-facing explanations for AI outputs." },
          { label: "Human-in-the-Loop Safeguards", desc: "Defined checkpoints requiring human review, override mechanisms, and escalation paths for AI-driven decisions." },
          { label: "AI Ethics Board", desc: "Cross-functional ethics review board with defined charter, use case review process, and veto authority for high-risk AI." },
        ] },
        { id: "ai3", label: "Shadow AI & Inventory", desc: "Shadow AI & Inventory provides visibility into every AI system operating within the enterprise, whether officially sanctioned or adopted informally by business units. Without a complete inventory and discovery capability, the organization cannot assess risk, enforce policy, or protect intellectual property associated with AI usage.", children: [
          { label: "AI System Registry", desc: "Centralized inventory of all AI systems with risk classification, data inputs, business owners, and deployment status." },
          { label: "Shadow AI Discovery", desc: "Network and SaaS monitoring to detect unauthorized AI tool usage, API calls to AI services, and browser extension AI." },
          { label: "Sanctioned AI Tool Catalog", desc: "Approved AI tools and services catalog with security assessments, acceptable use boundaries, and provisioning workflows." },
          { label: "AI Use Case Review", desc: "Intake process for new AI use cases including risk assessment, data sensitivity review, and governance approval gates." },
          { label: "AI IP & Output Protection", desc: "Policies for intellectual property protection of AI-generated outputs, confidential data in prompts, and model output ownership." },
        ] },
        { id: "ai4", label: "Securing AI Systems", desc: "Securing AI Systems protects AI models and their supporting infrastructure from adversarial manipulation, data compromise, and exploitation techniques unique to machine learning. As AI systems become high-value targets, this sub-domain applies purpose-built security controls that traditional application security alone cannot address." },
        { id: "ai5", label: "Agentic AI & Autonomy", desc: "Agentic AI & Autonomy governs the rapidly expanding class of AI systems that can take independent actions, make decisions, and interact with other systems without direct human instruction. It establishes the boundaries, override mechanisms, and audit capabilities necessary to maintain meaningful human control as AI autonomy increases.", children: [
          { label: "Agent Permission Boundaries", desc: "Least-privilege permission models for AI agents defining allowed actions, data access scope, and system integration limits." },
          { label: "Guardrails & Safety Constraints", desc: "Input/output validation, content filtering, action limiting, and behavioral boundaries enforced at the agent runtime layer." },
          { label: "Kill-Switch & Override Protocols", desc: "Emergency shutdown mechanisms, human override procedures, and graceful degradation paths for autonomous agents." },
          { label: "Agent Audit Trails", desc: "Comprehensive logging of agent decisions, tool invocations, reasoning chains, and state changes for post-hoc review." },
          { label: "Human Oversight Thresholds", desc: "Defined autonomy levels with escalation triggers requiring human approval for high-impact or irreversible agent actions." },
          { label: "Multi-Agent Coordination Security", desc: "Trust boundaries between cooperating agents, inter-agent authentication, and delegation chain validation." },
        ] },
        { id: "ai6", label: "AI-Enabled Security", desc: "AI-Enabled Security leverages artificial intelligence and machine learning to amplify the speed, scale, and accuracy of the organization's defensive capabilities. It transforms security operations by automating repetitive analysis, surfacing hidden threats, and enabling human analysts to focus on the judgments that matter most.", children: [
          { label: "AI-Augmented Threat Detection", desc: "Machine learning models for anomaly detection, behavioral analytics, and alert correlation to reduce false positives." },
          { label: "GenAI Security Automation", desc: "Generative AI for incident summarization, playbook generation, threat intelligence synthesis, and analyst workflow assistance." },
          { label: "AI-Augmented SOC Operations", desc: "AI copilots for SOC analysts including automated triage, enrichment, investigation assistance, and response recommendations." },
          { label: "ML Model Training & Retraining", desc: "Training pipelines for security ML models, data labeling, model versioning, performance monitoring, and drift-triggered retraining." },
          { label: "Security AI Use Case Governance", desc: "Evaluation framework for AI security tool effectiveness, ROI measurement, false positive/negative tracking, and tool selection criteria." },
        ] },
        { id: "ai7", label: "AI Risk Assessment", desc: "AI Risk Assessment applies structured risk management discipline to AI systems, recognizing that models carry unique risks such as drift, hallucination, and unpredictable failure modes. It ensures AI-specific threats are identified, quantified, and tracked with the same rigor the organization applies to any other critical technology risk.", children: [
          { label: "Model Risk Management", desc: "Structured model risk framework covering model inventory, risk tiering, validation requirements, and ongoing monitoring." },
          { label: "AI-Specific Risk Register", desc: "Dedicated risk register entries for AI risks including bias, hallucination, data leakage, model theft, and adversarial attacks." },
          { label: "AI Impact Assessments", desc: "Pre-deployment impact assessments evaluating safety, fairness, privacy, and security risks for new AI systems." },
          { label: "Model Validation & Testing", desc: "Independent model validation including accuracy testing, stress testing, boundary condition analysis, and challenger models." },
          { label: "Model Drift Detection", desc: "Continuous monitoring for data drift, concept drift, and performance degradation with automated alerting and retraining triggers." },
        ] },
        { id: "ai8", label: "AI Supply Chain & Provenance", desc: "AI Supply Chain & Provenance tracks the origin, integrity, and dependencies of AI models and training data throughout their lifecycle. As organizations increasingly rely on third-party and open-source models, this sub-domain ensures that inherited risks are understood and that model lineage can be verified and audited.", children: [
          { label: "Model Provenance Tracking", desc: "End-to-end tracking of model origin, training history, fine-tuning lineage, and deployment chain of custody." },
          { label: "Training Data Lineage", desc: "Documentation and verification of training data sources, licensing, consent basis, and data quality assessments." },
          { label: "Third-Party Model Risk", desc: "Risk assessment of externally sourced models including open-source models, commercial APIs, and model marketplace offerings." },
          { label: "Foundation Model Dependencies", desc: "Inventory and risk tracking of foundation model dependencies, version management, and vendor lock-in analysis." },
          { label: "Model Cards & Documentation", desc: "Standardized model cards documenting intended use, limitations, performance metrics, bias evaluations, and ethical considerations." },
        ] },
      ],
    },
    {
      id: "supply", label: "Supply Chain\nTransparency", color: "#10B981", icon: "🔗",
      children: [
        { id: "sc1", label: "Third-Party Risk (TPRM)", desc: "Third-Party Risk (TPRM) manages the security exposure created every time the organization shares data, access, or connectivity with an external vendor or partner. It provides a systematic approach to evaluating, contractually binding, and continuously monitoring third parties so that their security weaknesses do not become the organization's breaches.", children: [
          { label: "Vendor Risk Tiering", desc: "Classification of vendors by criticality, data access, and business impact for proportional assessment." },
          { label: "Security Questionnaires & Assessments", desc: "Standardized security questionnaires (SIG, CAIQ), on-site assessments, and evidence review." },
          { label: "Contractual Security Requirements", desc: "Security obligations in contracts including breach notification, audit rights, and data handling." },
          { label: "Continuous Monitoring", desc: "Ongoing vendor risk monitoring beyond point-in-time assessments using automated feeds and signals." },
          { label: "TPRM Automation & Tooling", desc: "Platforms and workflows for scaling vendor assessments, tracking remediation, and reporting." },
          { label: "Vendor Risk Remediation Tracking", desc: "Tracking vendor remediation of identified risks with SLAs and escalation paths." },
        ] },
        { id: "sc2", label: "Software Supply Chain", desc: "Software Supply Chain secures the integrity of every software component — open-source libraries, third-party dependencies, and build artifacts — that enters the organization's codebase. In an era where attackers increasingly target upstream components rather than the organization directly, this sub-domain ensures that what you build is only what you intended.", children: [
          { label: "SBOM Generation & Management", desc: "Creating, maintaining, and sharing software bills of materials for all delivered software." },
          { label: "Dependency Scanning", desc: "Automated scanning of direct and transitive dependencies for known vulnerabilities." },
          { label: "Provenance Verification", desc: "Verifying the origin and integrity of software components through signatures and attestations." },
          { label: "Build Pipeline Integrity", desc: "Securing build systems, reproducible builds, and protecting against build-time tampering." },
          { label: "Artifact Signing", desc: "Cryptographic signing of build artifacts, container images, and release packages." },
          { label: "Open Source Governance", desc: "Policies for open source adoption, contribution, license compliance, and community engagement." },
        ] },
        { id: "sc3", label: "Procurement Security", desc: "Procurement Security embeds security requirements into the vendor selection and onboarding process before contracts are signed and integrations begin. By establishing security gates early in procurement, it prevents the organization from inheriting avoidable risk and ensures leverage exists to enforce standards contractually.", children: [
          { label: "Security Requirements in RFPs", desc: "Standardized security requirements embedded in requests for proposals based on vendor risk tier and data sensitivity." },
          { label: "Contract Security Language", desc: "Security clauses covering breach notification, audit rights, data handling, encryption requirements, and termination provisions." },
          { label: "Security Addenda & Schedules", desc: "Modular security addenda attached to contracts with specific technical and operational security requirements." },
          { label: "Vendor Onboarding Security Gates", desc: "Pre-production security gates including questionnaire completion, evidence review, and risk acceptance sign-off." },
          { label: "Security Scoring in Vendor Selection", desc: "Weighted security scoring criteria integrated into vendor evaluation and selection decision frameworks." },
        ] },
        { id: "sc4", label: "Continuous Vendor Monitoring", desc: "Continuous Vendor Monitoring shifts third-party risk management from periodic point-in-time assessments to ongoing, near-real-time visibility into vendor security posture. It ensures that material changes in a vendor's risk profile are detected and acted upon promptly rather than discovered at the next annual review.", children: [
          { label: "Real-Time Vendor Risk Scoring", desc: "Continuous vendor risk scoring using external signals including security ratings, threat intelligence, and breach databases." },
          { label: "Breach Notification Feeds", desc: "Automated monitoring of vendor breach disclosures, regulatory filings, and dark web mentions for early warning." },
          { label: "Financial Health Monitoring", desc: "Tracking vendor financial stability, credit ratings, and market signals that may indicate operational risk." },
          { label: "Automated Reassessment Triggers", desc: "Event-driven reassessment workflows triggered by risk score changes, breaches, M&A activity, or contract renewals." },
          { label: "Vendor Performance Metrics", desc: "Tracking vendor SLA adherence, security incident frequency, remediation responsiveness, and assessment completion rates." },
        ] },
        { id: "sc5", label: "Concentration & 4th Party", desc: "Concentration & 4th Party identifies and manages the hidden dependencies that arise when multiple critical vendors rely on the same upstream providers or infrastructure. It maps risk beyond direct vendor relationships to reveal single points of failure and cascading impacts that traditional TPRM programs often miss.", children: [
          { label: "Vendor Dependency Mapping", desc: "Visual mapping of critical vendor dependencies showing interconnections, shared infrastructure, and cascading failure paths." },
          { label: "Single-Point-of-Failure Analysis", desc: "Identification of vendors whose failure would cause business disruption with no readily available alternative." },
          { label: "Nth-Party Visibility", desc: "Extending risk visibility beyond Tier-1 vendors to subcontractors, sub-processors, and their dependencies." },
          { label: "Cascading Obligation Management", desc: "Ensuring security and compliance requirements flow down through the vendor chain via contractual back-to-back clauses." },
          { label: "Concentration Risk Mitigation", desc: "Strategies for reducing single-vendor reliance including multi-vendor architectures and contingency contracts." },
        ] },
        { id: "sc6", label: "Cloud & SaaS Supply Chain", desc: "Cloud & SaaS Supply Chain addresses the unique risks that emerge when the organization's data and operations depend on interconnected cloud services and SaaS platforms. It closes the gaps in shared responsibility models and evaluates the compounding risk of SaaS-to-SaaS integrations that can create unmonitored data pathways.", children: [
          { label: "SaaS Security Posture Assessment", desc: "Evaluating SaaS provider security controls, configuration options, data handling, and multi-tenancy isolation." },
          { label: "Cloud Provider Dependency Analysis", desc: "Mapping critical dependencies on cloud infrastructure providers, understanding blast radius of provider outages." },
          { label: "Shared Responsibility Gap Analysis", desc: "Identifying security gaps between cloud provider responsibilities and customer obligations across IaaS/PaaS/SaaS." },
          { label: "SaaS-to-SaaS Integration Risk", desc: "Assessing risk from SaaS integrations, OAuth token grants, data sharing between SaaS platforms, and API connector security." },
          { label: "SaaS Configuration Security", desc: "Monitoring and enforcing security configurations across SaaS applications using SSPM tooling and baseline policies." },
        ] },
        { id: "sc7", label: "Vendor Transparency", desc: "Vendor Transparency establishes the expectation that critical vendors will openly share their security practices, subprocessor relationships, and data handling with the organization. Greater vendor transparency reduces information asymmetry, accelerates risk assessments, and enables more informed decisions about which third parties to trust.", children: [
          { label: "Vendor Security Standards Publication", desc: "Requiring and publishing vendor security certifications, audit reports, and compliance attestations." },
          { label: "Subprocessor Disclosure", desc: "Maintaining and communicating current subprocessor lists with notification workflows for changes." },
          { label: "Data Flow Disclosures", desc: "Vendor-provided documentation of data flows, storage locations, processing purposes, and cross-border transfers." },
          { label: "SLA Transparency & Reporting", desc: "Public or contractual SLA dashboards showing uptime, incident history, and security performance metrics." },
          { label: "Vendor Trust Posture Assessment", desc: "Evaluating vendors' own trust and transparency programs as indicators of security culture maturity." },
        ] },
        { id: "sc8", label: "Supply Chain Incidents", desc: "Supply Chain Incidents ensures the organization can rapidly detect, respond to, and recover from security events that originate within its vendor ecosystem or software dependencies. When a supplier is compromised, the speed and coordination of the response directly determines whether the impact is contained or cascading.", children: [
          { label: "Supply Chain Breach Playbooks", desc: "Incident response playbooks specific to vendor compromise, software supply chain attacks, and SaaS provider breaches." },
          { label: "Vendor Notification Protocols", desc: "Defined escalation paths, SLA-driven notification timelines, and communication templates for vendor-triggered incidents." },
          { label: "Component Inventory for IR", desc: "Rapidly queryable software and vendor inventory enabling impact assessment when supply chain compromises are disclosed." },
          { label: "Coordinated Vulnerability Disclosure", desc: "Processes for responsible disclosure with vendors, coordinated public notification, and customer advisory management." },
          { label: "Supply Chain Incident Postmortems", desc: "Post-incident analysis of supply chain events including vendor accountability review and control improvement tracking." },
        ] },
        { id: "sc9", label: "Regulatory & Compliance", desc: "Regulatory & Compliance tracks the growing body of legislation worldwide that holds organizations accountable for the security of their supply chains, not just their own perimeters. It ensures the organization meets evolving mandates around software integrity, vendor oversight, and cross-border obligations before regulators enforce them.", children: [
          { label: "EU Cyber Resilience Act Compliance", desc: "Product security requirements, vulnerability handling obligations, and conformity assessment for digital products in the supply chain." },
          { label: "EO 14028 & Federal Requirements", desc: "Executive order requirements for software supply chain security including SBOM provision, secure development attestation, and federal supplier obligations." },
          { label: "DORA ICT Third-Party Provisions", desc: "Financial sector requirements for ICT third-party risk management, concentration risk, and critical provider oversight." },
          { label: "NIS2 Supply Chain Requirements", desc: "Essential and important entity obligations for supply chain cybersecurity, incident reporting, and risk management measures." },
          { label: "Cross-Border Vendor Obligations", desc: "Managing supply chain compliance across jurisdictions including data sovereignty, local processing requirements, and extraterritorial reach." },
        ] },
      ],
    },
    {
      id: "data", label: "Data Practices\n& Privacy", color: "#EC4899", icon: "🔐",
      children: [
        { id: "dp1", label: "Data Governance & Classification", desc: "Data Governance & Classification establishes the foundational understanding of what data the organization holds, where it lives, how sensitive it is, and who is accountable for it. Without this foundation, every other data protection control operates blindly — you cannot protect what you have not identified and classified.", children: [
          { label: "Data Discovery & Inventory", desc: "Automated scanning to discover structured and unstructured data across on-prem, cloud, and SaaS environments." },
          { label: "Data Classification & Labeling", desc: "Sensitivity classification schemes (public, internal, confidential, restricted) with automated and manual labeling." },
          { label: "Data Lineage & Flow Mapping", desc: "Tracking data origin, transformations, and destinations to understand how data moves through systems." },
          { label: "Retention & Destruction Policies", desc: "Defined retention schedules by data type with automated purging and verified destruction procedures." },
          { label: "Data Ownership & Stewardship", desc: "Assigned data owners and stewards per domain with clear accountability for quality, access, and lifecycle." },
          { label: "Data Access Controls", desc: "Role-based and attribute-based access controls enforcing least privilege aligned to classification level." },
        ] },
        { id: "dp2", label: "Privacy Engineering", desc: "Privacy Engineering builds privacy protections directly into systems and processes from the start rather than attempting to retrofit them after deployment. It operationalizes privacy principles through technical controls that minimize data collection, limit usage to stated purposes, and prevent exposure before it occurs.", children: [
          { label: "Privacy-by-Design Reviews", desc: "Embedding privacy requirements into system design through architectural reviews and design patterns." },
          { label: "Data Minimization & Purpose Limitation", desc: "Engineering controls ensuring only necessary data is collected and used solely for stated purposes." },
          { label: "Privacy Impact Assessments (PIAs)", desc: "Automated and manual PIAs triggered by new processing activities, system changes, or vendor integrations." },
          { label: "Encryption & Tokenization", desc: "Data protection through encryption at rest and in transit, tokenization of sensitive fields, and format-preserving encryption." },
          { label: "Data Masking & Anonymization", desc: "Techniques for de-identification, pseudonymization, and synthetic data generation for non-production environments." },
          { label: "DLP Integration", desc: "Data loss prevention controls aligned to privacy policy, monitoring exfiltration of personal and sensitive data." },
        ] },
        { id: "dp3", label: "Consent & Rights Management", desc: "Consent & Rights Management enables the organization to honor the promises it makes to individuals about how their data will be used and to fulfill their legal rights efficiently. As privacy regulations expand globally, the ability to manage consent and respond to data subject requests at scale is both a legal obligation and a trust differentiator.", children: [
          { label: "Consent Management Platform", desc: "Centralized consent collection, storage, and enforcement across web, mobile, and third-party channels." },
          { label: "Data Subject Request Fulfillment", desc: "Automated workflows for access, correction, deletion, and portability requests with SLA tracking." },
          { label: "Preference Centers", desc: "User-facing portals for managing communication preferences, data sharing opt-outs, and consent granularity." },
          { label: "Right-to-Delete Workflows", desc: "End-to-end deletion orchestration across primary systems, backups, analytics, and downstream processors." },
          { label: "Consent Audit Trail", desc: "Immutable records of consent grants, withdrawals, and modifications for regulatory evidence." },
        ] },
        { id: "dp4", label: "Cross-Border Data Flows", desc: "Cross-Border Data Flows navigates the complex and evolving patchwork of international data transfer regulations that govern how personal data moves between jurisdictions. It ensures the organization can operate globally without running afoul of sovereignty requirements, transfer restrictions, or conflicting legal obligations.", children: [
          { label: "Transfer Impact Assessments", desc: "Evaluating legal protections in recipient countries and supplementary measures required for lawful transfers." },
          { label: "Standard Contractual Clauses (SCCs)", desc: "Implementation and management of EU SCCs, UK IDTA, and equivalent transfer mechanisms with vendors and affiliates." },
          { label: "Adequacy & Certification Frameworks", desc: "Tracking adequacy decisions, EU-US Data Privacy Framework certification, and alternative transfer mechanisms." },
          { label: "Data Sovereignty & Residency", desc: "Technical controls ensuring data storage and processing comply with jurisdictional residency requirements." },
          { label: "Jurisdictional Mapping", desc: "Maintaining an inventory of data flows mapped to applicable jurisdictions and their regulatory requirements." },
        ] },
        { id: "dp5", label: "Data Ethics", desc: "Data Ethics goes beyond legal compliance to address whether the organization should use data in certain ways, even when it technically can. It establishes principles and oversight for secondary data use, anonymization practices, and customer-facing transparency that build long-term trust and protect brand reputation.", children: [
          { label: "Ethical Use Policies", desc: "Organizational policies defining acceptable and prohibited uses of personal and sensitive data." },
          { label: "Secondary Use Restrictions", desc: "Controls preventing data collected for one purpose from being repurposed without proper authorization or consent." },
          { label: "Anonymization & De-Identification Standards", desc: "Standards and validation for anonymization techniques ensuring data cannot be re-identified." },
          { label: "Data Ethics Board", desc: "Cross-functional review body evaluating novel data uses, algorithmic decisions, and ethical edge cases." },
          { label: "Customer-Facing Transparency", desc: "Clear privacy notices, data practice disclosures, and accessible explanations of how data is used." },
        ] },
        { id: "dp6", label: "Privacy Program Management", desc: "Privacy Program Management provides the organizational structure, talent, and operational cadence needed to sustain privacy as an ongoing discipline rather than a one-time compliance project. It ensures accountability is clear, knowledge is distributed through privacy champions, and regulatory relationships are maintained proactively.", children: [
          { label: "Privacy Office Structure", desc: "DPO/CPO role definition, privacy team staffing, reporting lines, and organizational placement for independence." },
          { label: "Privacy Champions Network", desc: "Embedded privacy advocates in business units providing frontline guidance and escalation to the privacy office." },
          { label: "Privacy Training Programs", desc: "Role-based privacy training for engineering, marketing, HR, and customer-facing teams with completion tracking." },
          { label: "Regulatory Relationship Management", desc: "Proactive engagement with data protection authorities, response to regulatory inquiries, and supervisory consultations." },
          { label: "Privacy Program Metrics", desc: "KPIs tracking DSR volume, PIA completion rates, training coverage, incident trends, and program maturity." },
        ] },
        { id: "dp7", label: "Data Breach & Incident Response", desc: "Data Breach & Incident Response ensures the organization can meet tight regulatory notification deadlines and manage the operational complexity of a data breach with precision. It bridges security incident response and privacy operations so that breach assessment, notification, and remediation happen in a coordinated and legally defensible manner.", children: [
          { label: "Privacy-Specific IR Playbooks", desc: "Playbooks tailored to personal data breaches including data type assessment, scope determination, and harm analysis." },
          { label: "Breach Notification Workflows", desc: "Automated workflows for notifying affected individuals, regulators, and partners within required timeframes." },
          { label: "Regulatory Reporting Automation", desc: "Templated reporting to data protection authorities with jurisdiction-aware timelines and content requirements." },
          { label: "Breach Severity Assessment", desc: "Frameworks for evaluating breach severity based on data sensitivity, volume, and risk of harm to individuals." },
          { label: "Remediation & Prevention Tracking", desc: "Post-breach remediation actions tracked to completion with root cause analysis feeding back into privacy controls." },
        ] },
        { id: "dp8", label: "Records Management", desc: "Records Management governs the lifecycle of organizational records from creation through disposition, ensuring information is retained when required and destroyed when permitted. It reduces legal exposure from over-retention, supports e-discovery obligations, and ensures the organization is not storing liabilities disguised as archives.", children: [
          { label: "Retention Schedule Development", desc: "Business and regulatory-driven retention schedules by record type with periodic review and updates." },
          { label: "Legal Hold Management", desc: "Litigation hold processes preserving relevant records during legal proceedings with custodian acknowledgment tracking." },
          { label: "Records Disposition & Destruction", desc: "Verified destruction of records past retention with certificates of destruction and audit trails." },
          { label: "E-Discovery Readiness", desc: "Processes and tools for efficient identification, collection, and production of electronically stored information." },
          { label: "Archival Policies & Long-Term Storage", desc: "Archival standards for historical and regulatory records including format preservation and accessibility." },
        ] },
      ],
    },
    {
      id: "appsec", label: "Application\nSecurity", color: "#F97316", icon: "💻",
      children: [
        { id: "as1", label: "Secure Development", desc: "Secure Development establishes the coding standards, review processes, and automated analysis tools that prevent vulnerabilities from being introduced during software creation. It is the most cost-effective point to address security flaws — finding and fixing issues in development costs a fraction of remediating them in production.", children: [
          { label: "Secure Coding Standards", desc: "Language-specific secure coding guidelines, banned function lists, and security linting rules enforced in CI." },
          { label: "Mandatory Code Review", desc: "Security-focused review gates with reviewer checklists and mandatory approval before merge." },
          { label: "SAST Integration", desc: "Static application security testing integrated into build pipelines with tuned rulesets and suppression management." },
          { label: "DAST Integration", desc: "Dynamic testing against running applications, authenticated scanning, and crawl coverage validation." },
          { label: "IDE Security Plugins", desc: "Real-time security feedback in developer IDEs for instant vulnerability detection during coding." },
          { label: "Developer Security Training", desc: "Hands-on secure coding training, CTF exercises, and language/framework-specific security workshops." },
        ] },
        { id: "as2", label: "Security Champions", desc: "Security Champions scales security expertise across development teams by embedding trained advocates who can make real-time security decisions without creating bottlenecks. This distributed model ensures that security guidance is available at the moment of development, not just at formal review gates.", children: [
          { label: "Champion Recruitment & Selection", desc: "Identifying and recruiting security-interested developers from each team with defined selection criteria." },
          { label: "Champion Training Curriculum", desc: "Structured training covering secure coding, threat modeling, vulnerability triage, and security tool usage." },
          { label: "Security Office Hours", desc: "Regular open sessions where developers can get security guidance, architecture review, and tool support." },
          { label: "Escalation Paths & Triage Support", desc: "Defined escalation workflows from champions to AppSec for complex findings, exceptions, and risk decisions." },
          { label: "Champion Recognition & Incentives", desc: "Recognition programs, gamification, career path benefits, and metrics tracking champion impact." },
        ] },
        { id: "as3", label: "DevSecOps Pipeline", desc: "DevSecOps Pipeline integrates automated security testing and controls directly into the CI/CD workflow so that every code change is evaluated before it reaches production. It makes security a continuous, frictionless part of delivery rather than a gate that slows releases or gets bypassed under deadline pressure.", children: [
          { label: "CI/CD Security Gates", desc: "Automated security quality gates that block builds failing security thresholds." },
          { label: "IaC Scanning", desc: "Infrastructure-as-code scanning for misconfigurations in Terraform, CloudFormation, Kubernetes manifests." },
          { label: "Shift-Left Testing", desc: "Security testing moved earlier in the SDLC with pre-commit hooks and PR-level scanning." },
          { label: "Change Control & Approval", desc: "Formal change management with security review requirements for production deployments." },
          { label: "File Integrity Monitoring", desc: "Detection of unauthorized changes to critical files, configurations, and binaries." },
          { label: "Pipeline Secret Detection", desc: "Automated scanning for leaked credentials, API keys, and tokens in CI/CD pipelines and artifacts." },
        ] },
        { id: "as4", label: "Threat Modeling", desc: "Threat Modeling systematically identifies what can go wrong in a system's design by analyzing architecture, data flows, and trust boundaries before vulnerabilities materialize in code. It shifts security thinking from reactive vulnerability hunting to proactive risk elimination at the design stage.", children: [
          { label: "Architecture Threat Modeling", desc: "Systematic analysis of system architecture to identify threats, attack surfaces, and trust boundaries." },
          { label: "STRIDE/PASTA Methodologies", desc: "Structured threat modeling using STRIDE for categorization or PASTA for risk-centric analysis." },
          { label: "Design Review Gates", desc: "Mandatory security design reviews before development begins for new features and architectural changes." },
          { label: "Data Flow Diagramming", desc: "Visual mapping of data flows, trust boundaries, and entry points as inputs to threat analysis." },
          { label: "Threat Model Maintenance", desc: "Updating threat models as systems evolve, with change-triggered reviews and periodic reassessments." },
        ] },
        { id: "as5", label: "API Security", desc: "API Security protects the interfaces that increasingly serve as the connective tissue between applications, services, and partners. As APIs expose business logic and sensitive data programmatically, they demand purpose-built authentication, authorization, and abuse prevention controls distinct from traditional web application defenses.", children: [
          { label: "API Discovery & Inventory", desc: "Automated discovery and cataloging of all APIs including shadow and zombie APIs." },
          { label: "API Authentication & Authorization", desc: "OAuth/OIDC implementation, API key management, and fine-grained access control." },
          { label: "Rate Limiting & Throttling", desc: "API abuse prevention through request rate limits, throttling policies, and quota management." },
          { label: "Input Validation & Schema Enforcement", desc: "Request/response schema validation, payload size limits, and type enforcement." },
          { label: "API Threat Modeling", desc: "API-specific threat analysis including BOLA, BFLA, and OWASP API Security Top 10." },
          { label: "API Gateway Security", desc: "Centralized API gateway policies, TLS termination, request transformation, and logging." },
        ] },
        { id: "as6", label: "Web Application Defense", desc: "Web Application Defense provides the runtime protections that shield production web applications from active exploitation, automated attacks, and abuse. It serves as the last line of defense for internet-facing assets, mitigating threats that evade pre-deployment testing and addressing vulnerabilities that cannot be immediately patched.", children: [
          { label: "WAF Management & Tuning", desc: "Web application firewall deployment, rule tuning, false positive management, and virtual patching." },
          { label: "OWASP Top 10 Coverage", desc: "Systematic testing and mitigation for injection, broken authentication, XSS, CSRF, and other OWASP Top 10 risks." },
          { label: "Bot Management", desc: "Detection and mitigation of malicious bots, credential stuffing, scraping, and automated abuse." },
          { label: "DDoS Protection (Application Layer)", desc: "Layer 7 DDoS mitigation, rate limiting, challenge pages, and application-aware traffic filtering." },
          { label: "Content Security Policies", desc: "CSP headers, CORS configuration, HSTS enforcement, and browser security header hardening." },
        ] },
        { id: "as7", label: "Mobile App Security", desc: "Mobile App Security addresses the distinct threat landscape of applications running on devices the organization does not fully control, in environments that are inherently hostile. It ensures that sensitive data, credentials, and business logic remain protected despite the unique risks of mobile platforms and untrusted networks.", children: [
          { label: "Mobile SAST/DAST", desc: "Static and dynamic analysis of mobile applications for platform-specific vulnerabilities on iOS and Android." },
          { label: "Secure Local Storage", desc: "Encrypted key stores, secure enclaves, and prevention of sensitive data leakage to logs, backups, and caches." },
          { label: "Certificate Pinning", desc: "TLS certificate pinning implementation, pin rotation procedures, and fallback mechanisms for pinning failures." },
          { label: "App Store Security Review", desc: "Pre-submission security review process, compliance with app store guidelines, and privacy label accuracy." },
          { label: "Jailbreak & Root Detection", desc: "Runtime detection of compromised device environments with appropriate risk-based response actions." },
          { label: "Mobile API Security", desc: "Securing mobile-to-backend API communication including token management, anti-tampering, and replay prevention." },
        ] },
        { id: "as8", label: "Container & Cloud-Native Security", desc: "Container & Cloud-Native Security protects the modern application stack where workloads are ephemeral, orchestrated, and decomposed into microservices. Traditional security tools designed for static infrastructure cannot adequately address the speed, scale, and architectural patterns of containerized and serverless environments.", children: [
          { label: "Container Image Scanning", desc: "Scanning base and application images for vulnerabilities, misconfigurations, and embedded secrets in CI/CD and registries." },
          { label: "Runtime Container Protection", desc: "Runtime monitoring, syscall filtering, drift detection, and anomalous process execution prevention in containers." },
          { label: "Kubernetes Security Policies", desc: "Pod security standards, RBAC configuration, network policies, admission controllers, and cluster hardening." },
          { label: "Service Mesh Security", desc: "Mutual TLS between services, authorization policies, traffic encryption, and observability for east-west traffic." },
          { label: "Serverless Hardening", desc: "Function permission scoping, execution time limits, dependency scanning, and event-source validation for serverless." },
          { label: "Container Registry Security", desc: "Registry access controls, image signing, provenance verification, and trusted base image policies." },
        ] },
        { id: "as9", label: "Open Source & SCA", desc: "Open Source & SCA manages the risk inherent in the open-source components that now comprise the majority of most application codebases. It provides visibility into what open-source libraries are in use, whether they carry known vulnerabilities or license restrictions, and whether they are being maintained by their upstream communities.", children: [
          { label: "Software Composition Analysis", desc: "Automated SCA scanning in CI/CD for known vulnerabilities in direct and transitive dependencies." },
          { label: "OSS Component Inventory", desc: "Maintaining a comprehensive inventory of all open-source components with version tracking and ownership." },
          { label: "License Compliance", desc: "Automated license detection, copyleft risk assessment, and policy enforcement for acceptable license types." },
          { label: "Dependency Update Management", desc: "Automated dependency update tooling, breaking change assessment, and patch prioritization workflows." },
          { label: "Public Repository Security", desc: "Security policies for organizational public repos, secret scanning, branch protection, and contribution guidelines." },
        ] },
        { id: "as10", label: "Secrets Management", desc: "Secrets Management prevents credentials, API keys, tokens, and certificates from being exposed in source code, configuration files, or insecure storage. Compromised secrets remain one of the most common and consequential attack vectors, making disciplined lifecycle management and automated detection essential.", children: [
          { label: "Secrets Detection in Source Code", desc: "Pre-commit and CI/CD scanning for hardcoded credentials, API keys, tokens, and private keys in repositories." },
          { label: "Vault Integration", desc: "Centralized secrets management via HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault with application integration." },
          { label: "Credential Rotation Policies", desc: "Automated credential rotation schedules, just-in-time secret provisioning, and expiration enforcement." },
          { label: "Certificate Lifecycle Management", desc: "TLS/SSL certificate inventory, automated renewal, expiration monitoring, and CA management." },
          { label: "Emergency Secret Revocation", desc: "Rapid revocation procedures for compromised credentials with cascading dependency handling and service impact mitigation." },
        ] },
        { id: "as11", label: "Development Environment Security", desc: "Development Environment Security protects the tools, systems, and infrastructure that developers use to build software — the very pipeline that attackers increasingly target to compromise downstream outputs. A compromised build system, repository, or developer workstation can inject malicious code that bypasses all subsequent security controls.", children: [
          { label: "Development Toolchain Integrity", desc: "Verified compiler and tool provenance, supply chain security for developer tools, and plugin vetting." },
          { label: "Build System Security", desc: "Build server hardening, build isolation, reproducible builds, and tamper detection in build outputs." },
          { label: "Code Repository Hardening", desc: "Branch protection rules, signed commits, access controls, audit logging, and repository configuration standards." },
          { label: "Developer Endpoint Protection", desc: "Hardened developer workstations, endpoint security tailored for dev workflows, and privileged access controls." },
          { label: "Artifact Registry Security", desc: "Access-controlled artifact repositories, integrity verification, provenance metadata, and retention policies." },
        ] },
      ],
    },
    {
      id: "business", label: "Business\nEnablement", color: "#84CC16", icon: "🚀",
      children: [
        { id: "be1", label: "Cloud Strategy", desc: "Cloud Strategy aligns the organization's cloud adoption with security principles, ensuring that the speed and flexibility of cloud services do not outpace the controls needed to protect them. It provides the governance framework for evaluating providers, enforcing consistent policy across environments, and maintaining visibility as the cloud footprint grows.", children: [
          { label: "Multi-Cloud Architecture & Strategy", desc: "Cloud provider selection criteria, multi-cloud vs. hybrid decisions, landing zone design, and workload placement policies." },
          { label: "SaaS Governance & Policy", desc: "SaaS adoption standards, sanctioned application catalog, data handling requirements, and shadow SaaS discovery." },
          { label: "Cloud Vendor Evaluation", desc: "Security assessment of cloud providers, shared responsibility model analysis, and contract security requirements." },
          { label: "Cloud SLA & Performance Management", desc: "Availability SLAs, incident notification requirements, support tier agreements, and performance monitoring." },
          { label: "Cloud Log Integration & Visibility", desc: "CloudTrail, Azure Monitor, GCP audit log ingestion into SIEM, and cross-cloud correlation." },
          { label: "Cloud Security Posture Management", desc: "CSPM tooling, misconfiguration detection, compliance benchmarking, and drift remediation for cloud environments." },
        ] },
        { id: "be2", label: "M&A Security", desc: "M&A Security evaluates and manages the cyber risk introduced when the organization acquires or merges with another entity. Every acquisition inherits the target's security debt, and without rigorous assessment and integration planning, that debt can quickly become the acquiring organization's next breach.", children: [
          { label: "Pre-Acquisition Security Due Diligence", desc: "Target company security posture assessment, vulnerability landscape review, and risk-adjusted deal valuation." },
          { label: "Integration Cost Estimation", desc: "Remediation cost modeling, tool rationalization budgeting, and security uplift timeline projection for acquired entities." },
          { label: "IAM & Network Integration", desc: "Identity directory consolidation, trust federation, network connectivity, and credential migration planning." },
          { label: "Security Tool Rationalization", desc: "Tool overlap analysis, license consolidation, agent migration, and unified monitoring for merged environments." },
          { label: "Posture Alignment & Gap Remediation", desc: "Baseline alignment to acquiring company standards, policy harmonization, and compliance gap closure." },
          { label: "Divestiture Security", desc: "Data separation, entitlement removal, system decoupling, and secure data transfer for divested business units." },
        ] },
        { id: "be3", label: "IoT & Emerging Tech", desc: "IoT & Emerging Tech prepares the security organization for technologies that are rapidly entering the enterprise but do not fit traditional security models. From IoT devices with minimal compute resources to quantum computing's threat to cryptography, this sub-domain ensures security stays ahead of the adoption curve.", children: [
          { label: "IoT Security Framework & Policy", desc: "IoT-specific security standards, acceptable device criteria, and network segmentation requirements for IoT zones." },
          { label: "Device Identity & Authentication", desc: "Certificate-based device identity, mutual TLS, device attestation, and hardware root of trust." },
          { label: "Firmware & OTA Update Security", desc: "Signed firmware updates, secure boot chains, rollback protection, and over-the-air update integrity verification." },
          { label: "Edge Computing Security", desc: "Edge node hardening, local data processing controls, edge-to-cloud encryption, and distributed workload protection." },
          { label: "IoT Protocol Security", desc: "MQTT, CoAP, and Zigbee protocol hardening, message encryption, and protocol-specific vulnerability mitigation." },
          { label: "Quantum Readiness", desc: "Post-quantum cryptography evaluation, crypto-agility planning, and quantum risk assessment for long-lived data." },
        ] },
        { id: "be4", label: "Mobile & Remote Work", desc: "Mobile & Remote Work secures the distributed workforce that now operates from personal devices, home networks, and public locations as a permanent operating model. It ensures that productivity and flexibility do not come at the cost of security by applying consistent controls regardless of where or how employees connect.", children: [
          { label: "BYOD & MDM Policy", desc: "Bring-your-own-device enrollment, mobile device management configuration, containerization, and remote wipe capabilities." },
          { label: "Mobile App Inventory & Management", desc: "Enterprise app catalog, sideloading restrictions, managed app distribution, and app vulnerability tracking." },
          { label: "Secure Remote Access", desc: "VPN, ZTNA, and clientless access options with posture checking, split-tunnel policies, and always-on connectivity." },
          { label: "Remote Work Attack Surface Management", desc: "Home network risk assessment, endpoint compliance verification, and remote worker security baseline enforcement." },
          { label: "Zero Trust for Distributed Workforce", desc: "Device trust signals, continuous posture assessment, context-aware access policies, and location-agnostic security." },
        ] },
        { id: "be5", label: "Agility & Resilience", desc: "Agility & Resilience ensures the security program can adapt to disruption — whether from cyberattacks, technology shifts, or business transformation — without losing effectiveness. It bridges continuity planning with forward-looking capability development so the organization can absorb shocks and capitalize on change simultaneously.", children: [
          { label: "Business Continuity Planning", desc: "Business impact analysis, recovery strategy development, continuity plan documentation, and plan maintenance." },
          { label: "Disaster Recovery", desc: "DR site management, recovery procedure testing, RTO/RPO validation, and failover/failback execution." },
          { label: "Industry Trend Analysis", desc: "Threat landscape monitoring, sector-specific risk evolution tracking, and peer benchmarking for emerging risks." },
          { label: "Digital Transformation Enablement", desc: "Security architecture for new digital initiatives, secure-by-default patterns, and friction reduction for innovation." },
          { label: "Resilience Testing & Validation", desc: "BC/DR tabletop exercises, recovery drills, chaos engineering, and cross-functional resilience simulations." },
        ] },
        { id: "be6", label: "Customer Trust & Assurance", desc: "Customer Trust & Assurance transforms the organization's security investments into visible, verifiable evidence that customers and partners can evaluate when making trust decisions. It proactively communicates security posture through trust portals, documentation, and transparency reports, turning security from a cost center into a competitive advantage.", children: [
          { label: "Trust Center / Portal", desc: "Public-facing trust portal with real-time compliance status, certifications, and self-service security documentation." },
          { label: "Customer-Facing Security Documentation", desc: "Security whitepapers, architecture diagrams, encryption descriptions, and data handling summaries for customers." },
          { label: "Audit Support Packages", desc: "Pre-built evidence packages for customer due diligence including SOC 2 reports, pen test summaries, and compliance attestations." },
          { label: "Transparency Reporting", desc: "Regular transparency reports on uptime, incident history, data requests, and security posture improvements." },
          { label: "Customer Security Reviews", desc: "Structured processes for responding to customer security assessments, site visits, and ad-hoc inquiries." },
        ] },
        { id: "be7", label: "Product Security", desc: "Product Security ensures that security is a built-in feature of the products the organization delivers to customers, not an afterthought addressed through patches. It governs how security is embedded throughout the product development lifecycle and how vulnerabilities are disclosed and resolved once products are in customer hands.", children: [
          { label: "Product Security Lifecycle", desc: "Security requirements in product roadmap, security design reviews, product-specific threat modeling, and release security gates." },
          { label: "Customer-Facing Security Features", desc: "Encryption controls, MFA options, audit logging, role-based access, and data export capabilities exposed to customers." },
          { label: "Product Vulnerability Disclosure", desc: "Product-specific VDP, coordinated disclosure with researchers, security advisory publication, and patch release cadence." },
          { label: "Product Security Testing", desc: "Product-focused penetration testing, regression testing for security fixes, and pre-release security validation." },
          { label: "Product Security Incident Response", desc: "Product-specific IR playbooks, customer notification workflows, hotfix processes, and root cause analysis for product vulnerabilities." },
          { label: "Secure Defaults & Hardening Guides", desc: "Secure-by-default product configurations, customer-facing hardening documentation, and deployment security guides." },
        ] },
        { id: "be8", label: "Security as Revenue Enabler", desc: "Security as Revenue Enabler positions the security program as a direct contributor to deal velocity, customer acquisition, and market differentiation. By streamlining RFP responses, maintaining relevant certifications, and equipping sales teams with security narratives, it removes friction from the revenue pipeline.", children: [
          { label: "Sales Enablement Support", desc: "Security subject matter expertise for sales calls, pre-sales security architecture sessions, and deal desk security reviews." },
          { label: "RFP & Questionnaire Management", desc: "Standardized questionnaire response library, SIG/CAIQ response automation, and turnaround SLA management." },
          { label: "Competitive Security Differentiation", desc: "Benchmarking security posture against competitors, articulating security as market advantage, and win/loss analysis on security." },
          { label: "Certification as Deal Accelerator", desc: "Strategic certification roadmap (SOC 2, ISO 27001, HITRUST, FedRAMP) aligned to target market requirements." },
          { label: "Security Revenue Metrics", desc: "Tracking security's influence on deal velocity, win rates, customer retention, and upsell attribution." },
        ] },
      ],
    },
    {
      id: "team", label: "Team & Culture\nManagement", color: "#D946EF", icon: "👥",
      children: [
        { id: "tm1", label: "Security Awareness & Training", desc: "Security Awareness & Training builds the human layer of defense by equipping every employee to recognize, avoid, and report security threats relevant to their role. It transforms the workforce from the organization's largest attack surface into an active line of defense through continuous education and behavioral reinforcement.", children: [
          { label: "Role-Based Training", desc: "Tailored training programs for developers, executives, IT ops, and general staff based on role-specific risks." },
          { label: "Phishing Simulations", desc: "Regular phishing campaigns with progressive difficulty, targeted simulations, and remedial training." },
          { label: "Awareness Campaigns", desc: "Ongoing security awareness initiatives, security month events, newsletters, and gamification." },
          { label: "Culture Metrics", desc: "Measurement of security culture health through surveys, phishing click rates, and reporting rates." },
          { label: "New Hire Security Onboarding", desc: "Security orientation for all new employees covering policies, tools, and reporting." },
          { label: "Executive Security Briefings", desc: "Tailored security updates for executives covering threat landscape, risk posture, and strategic initiatives." },
        ] },
        { id: "tm2", label: "Security Champions Program", desc: "Security Champions Program extends the security team's reach by cultivating trusted advocates embedded within business and engineering teams across the organization. Champions serve as a force multiplier — accelerating security adoption, reducing escalation bottlenecks, and fostering a shared sense of ownership for security outcomes.", children: [
          { label: "Champion Recruitment & Selection", desc: "Nomination criteria, volunteer recruitment, management endorsement, and balanced representation across business units." },
          { label: "Champion Training Curriculum", desc: "Tiered training program from fundamentals to advanced topics, hands-on labs, and ongoing skill development." },
          { label: "Office Hours & Consultation", desc: "Regular security office hours, champion-led Q&A sessions, and accessible channels for ad-hoc security guidance." },
          { label: "Cross-Team Advocacy & Communication", desc: "Champions as security liaisons within their teams, feedback loops to the security team, and policy interpretation." },
          { label: "Recognition & Incentive Programs", desc: "Champion contributions tracked and rewarded through gamification, awards, career development credit, and public recognition." },
        ] },
        { id: "tm3", label: "Talent & Retention", desc: "Talent & Retention addresses the existential challenge of attracting, developing, and keeping skilled security professionals in a market defined by chronic talent shortages. A deliberate talent strategy prevents the knowledge drain and operational gaps that result from attrition and ensures the team can sustain its mission long-term.", children: [
          { label: "Recruiting Pipeline & Strategy", desc: "Security-specific job descriptions, university partnerships, talent sourcing channels, and candidate assessment frameworks." },
          { label: "Performance Management", desc: "Security role competency models, performance evaluation criteria, promotion pathways, and feedback cadence." },
          { label: "Retention & Engagement Strategies", desc: "Competitive compensation, conference attendance, research time, rotation programs, and employee engagement initiatives." },
          { label: "Burnout Prevention & Wellbeing", desc: "On-call rotation fairness, workload monitoring, mental health resources, and sustainable operational tempo." },
          { label: "FTE / Contractor / MSSP Balance", desc: "Insource vs. outsource decisions, contractor management, MSSP oversight, and knowledge transfer requirements." },
          { label: "Succession Planning", desc: "Key person risk identification, cross-training for critical roles, leadership pipeline, and knowledge documentation." },
        ] },
        { id: "tm4", label: "Budget & Program Management", desc: "Budget & Program Management ensures that security investments are strategically allocated, financially justified, and aligned with organizational priorities. It provides the business discipline needed to demonstrate value, optimize spending across tools and services, and secure sustained funding in competition with other enterprise priorities.", children: [
          { label: "Budget Planning & Forecasting", desc: "Annual budget development, CapEx/OpEx allocation, multi-year investment planning, and variance tracking." },
          { label: "Business Case Development", desc: "ROI modeling for security investments, risk reduction quantification, and executive-ready justification packages." },
          { label: "Tool Rationalization & Portfolio Management", desc: "Tool overlap analysis, license optimization, vendor consolidation, and capability gap identification." },
          { label: "Strategic Planning & Roadmap", desc: "Multi-year security program strategy, initiative prioritization, milestone tracking, and OKR/KPI alignment." },
          { label: "Political Alignment & Stakeholder Buy-In", desc: "Cross-functional relationship building, executive sponsorship cultivation, influence mapping, and coalition building for security initiatives." },
          { label: "Consulting & Services Engagement", desc: "Advisory engagement scoping, consulting firm selection, statement-of-work management, and knowledge transfer requirements." },
        ] },
        { id: "tm5", label: "Skills Development", desc: "Skills Development continuously evolves the security team's technical and interpersonal capabilities to keep pace with a rapidly changing threat and technology landscape. It closes critical skill gaps in emerging areas while ensuring foundational expertise remains sharp, preventing the team from falling behind the adversaries they must address." },
        { id: "tm6", label: "Trust Culture", desc: "Trust Culture cultivates an organizational environment where employees feel safe reporting security concerns, near-misses, and mistakes without fear of blame. A strong trust culture accelerates incident detection, encourages proactive security behavior, and reinforces the principle that security is a shared organizational value." },
        { id: "tm7", label: "Organizational Design", desc: "Organizational Design defines how the security function is structured, where it reports, and how responsibilities are distributed to maximize effectiveness and influence. The right organizational model — whether centralized, federated, or hybrid — determines whether security operates as a strategic partner to the business or a peripheral compliance function.", children: [
          { label: "CISO Reporting Structure", desc: "Reporting line analysis (CEO, CIO, CRO, General Counsel), board access, independence considerations, and authority scope." },
          { label: "Team Structure Model", desc: "Centralized vs. federated vs. hybrid security team design, embedded security roles, and dotted-line relationships." },
          { label: "RACI for Security Functions", desc: "Responsibility assignment matrix across security, IT, engineering, and business units for key security activities." },
          { label: "Career Pathing & Progression", desc: "Security career ladders, individual contributor and management tracks, competency frameworks, and promotion criteria." },
          { label: "Organizational Change Management", desc: "Restructuring communication, role transition support, team charter updates, and stakeholder alignment during reorgs." },
        ] },
        { id: "tm8", label: "Stakeholder Engagement", desc: "Stakeholder Engagement builds and maintains the relationships with executives, business units, and cross-functional partners that the security program depends on for support, funding, and cooperation. Effective engagement ensures that security priorities are understood at every level and that the CISO has the influence needed to drive meaningful change.", children: [
          { label: "Executive Relationship Management", desc: "Regular 1:1 meetings with C-suite, tailored briefings by audience, trust building, and strategic influence cultivation." },
          { label: "Business Unit Partnerships", desc: "Embedded engagement with business units, understanding business priorities, and aligning security to unit-specific objectives." },
          { label: "Cross-Functional Working Groups", desc: "Security steering committees, architecture review boards, risk councils, and ad-hoc initiative-specific working groups." },
          { label: "Communication Cadence & Channels", desc: "Newsletter, intranet presence, all-hands updates, stakeholder-specific dashboards, and regular program status reporting." },
          { label: "Stakeholder Feedback & Satisfaction", desc: "Periodic stakeholder surveys, friction point identification, service-level tracking, and continuous engagement improvement." },
        ] },
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

  // ===== AS2: Security Champions =====
  ["as2", "tm1", "Champions extend security awareness by acting as local advocates — they need foundational training to be effective."],
  ["as2", "as1", "Champions enforce secure coding practices within their teams — they need to understand the standards they promote."],
  ["as2", "tm3", "Champion programs depend on recruiting and retaining motivated individuals from engineering teams."],
  ["as2", "gv3", "Champion program structure, responsibilities, and escalation paths must be defined in organizational policy."],
  ["as2", "as3", "Champions advocate for pipeline security adoption — they're the frontline for DevSecOps culture in squads."],
  ["as2", "tm5", "Champions need ongoing security skills development to stay credible advisors within their teams."],
  ["as4", "as2", "Threat modeling sessions benefit from security champions who understand local architecture and can drive follow-through."],
  ["as1", "as2", "Security champions provide peer review and coaching that scales secure development beyond the central AppSec team."],
  ["ir1", "as2", "Champions serve as first responders in development teams during application-layer security incidents."],

  // ===== AS4: Threat Modeling =====
  ["as4", "sa4", "Threat modeling is a core Secure SDLC activity — design-phase analysis must be integrated into the development lifecycle."],
  ["as4", "gv3", "Policies define when threat modeling is required — new projects, major changes, and risk-based triggers."],
  ["as4", "as1", "Threat model findings drive secure coding requirements — identified threats become specific defensive coding tasks."],
  ["as4", "rm1", "Threat modeling is a risk assessment applied at the application level — findings feed the risk register."],
  ["as4", "as5", "API-specific threat modeling identifies authentication, authorization, and data exposure risks in service interfaces."],
  ["as4", "dp2", "Threat models must identify privacy risks — where PII flows, where it's stored, and how it's exposed."],
  ["sa4", "as4", "Secure design reviews depend on threat modeling outputs to validate architecture decisions against identified threats."],
  ["so4", "as4", "Pen test scoping and attack trees are informed by existing threat models — they reveal where to focus offensive efforts."],

  // ===== AS7: Mobile App Security =====
  ["as7", "as1", "Mobile apps require secure development practices adapted for iOS and Android — SAST/DAST for mobile codebases."],
  ["as7", "as3", "Mobile app builds must pass through DevSecOps pipeline security gates before app store submission."],
  ["as7", "ia2", "Mobile authentication depends on platform-specific MFA — biometrics, push notifications, and device trust signals."],
  ["as7", "dp2", "Mobile apps handling PII must implement privacy-by-design — local storage encryption, data minimization, and consent."],
  ["as7", "gv3", "Mobile security standards define certificate pinning requirements, jailbreak detection thresholds, and storage encryption rules."],
  ["as7", "so2", "Mobile app vulnerabilities must be tracked through the vulnerability management pipeline with app store update SLAs."],
  ["be4", "as7", "BYOD and mobile workforce strategies depend on mobile app security controls to protect corporate data on personal devices."],
  ["as7", "as5", "Mobile apps consume APIs — certificate pinning and token management depend on API security architecture."],

  // ===== AS8: Container & Cloud-Native Security =====
  ["as8", "sa3", "Container security policies must align with cloud and hybrid architecture — Kubernetes, service mesh, and serverless platforms."],
  ["as8", "as3", "Container image scanning and admission control are DevSecOps pipeline gates before deployment."],
  ["as8", "so2", "Container image vulnerabilities feed into the vulnerability management pipeline for prioritization and remediation."],
  ["as8", "gv3", "Container security policies define base image standards, runtime constraints, and Kubernetes admission policies."],
  ["as8", "sc2", "Container base images are software supply chain dependencies — provenance and vulnerability tracking apply."],
  ["as8", "so3", "Container runtime anomaly detection feeds SOC monitoring — unexpected process execution, network connections, or file changes."],
  ["as8", "ia4", "Kubernetes service accounts and cloud workload identities are privileged credentials requiring PAM governance."],
  ["sa3", "as8", "Cloud-native architecture depends on container security controls to enforce runtime protection and network policies."],

  // ===== AS10: Secrets Management =====
  ["as10", "ia4", "Secrets management is a PAM-adjacent function — vault integration, credential rotation, and service account secrets."],
  ["as10", "as3", "Pipeline secret detection prevents credentials from leaking through CI/CD artifacts and build logs."],
  ["as10", "gv3", "Policies define rotation schedules, vault access controls, and acceptable secret storage mechanisms."],
  ["as10", "so2", "Exposed secrets discovered in code scanning are high-severity vulnerabilities requiring immediate rotation."],
  ["as10", "sa3", "Cloud-native secrets management leverages provider vaults and workload identity federation."],
  ["as10", "sc2", "Build pipeline integrity depends on secrets management — signing keys, registry credentials, and deploy tokens."],
  ["ia7", "as10", "Non-human identity credentials are stored and rotated through secrets management infrastructure."],
  ["as1", "as10", "Secure development requires developers to use vault-managed secrets instead of hardcoded credentials."],

  // ===== AS11: Development Environment Security =====
  ["as11", "as3", "Build system security and artifact registry hardening are prerequisites for a trustworthy DevSecOps pipeline."],
  ["as11", "sc2", "Software supply chain integrity starts with secure build systems — compromised toolchains poison all downstream artifacts."],
  ["as11", "so1", "Developer endpoint protection applies threat prevention controls to the machines where code is written."],
  ["as11", "ia4", "Code repository admin access and build system credentials are privileged and need PAM controls."],
  ["as11", "gv3", "Policies define code repository hardening standards, branch protection rules, and artifact signing requirements."],
  ["as11", "as10", "Development environments depend on secrets management to prevent credential leakage in source code and configs."],
  ["as3", "as11", "DevSecOps pipeline trustworthiness depends on the integrity of the underlying build systems and artifact registries."],
  ["sc2", "as11", "Software supply chain provenance starts at the build environment — compromised build infra undermines all attestation."],

  // ===== SC3: Procurement Security =====
  ["sc3", "sc1", "Procurement security gates feed the TPRM pipeline — security requirements in RFPs ensure vendors are assessed before onboarding."],
  ["sc3", "rm3", "Contract security language and addenda require legal review and negotiation."],
  ["sc3", "gv3", "Procurement security policies define minimum security requirements for RFPs and vendor onboarding gates."],
  ["sc3", "rm2", "Compliance requirements dictate what security certifications and evidence must be obtained during procurement."],
  ["sc3", "gv2", "Framework controls define supply chain procurement obligations — NIST 800-161, CMMC, and DORA."],
  ["sc1", "sc3", "Effective TPRM depends on procurement embedding security requirements before vendor relationships begin."],
  ["be2", "sc3", "M&A due diligence requires procurement security rigor to assess the acquired company's vendor portfolio."],

  // ===== SC4: Continuous Vendor Monitoring =====
  ["sc4", "sc1", "Continuous monitoring extends point-in-time TPRM assessments into ongoing risk visibility."],
  ["sc4", "so5", "Automated vendor risk scoring and reassessment triggers depend on security automation infrastructure."],
  ["sc4", "so3", "Breach notification feeds and dark web monitoring for vendor compromises leverage SOC intelligence capabilities."],
  ["sc4", "rm1", "Real-time vendor risk scores must integrate with the enterprise risk register for dynamic risk posture updates."],
  ["sc4", "gv3", "Policies define monitoring thresholds, reassessment triggers, and escalation criteria for vendor risk changes."],
  ["sc1", "sc4", "TPRM effectiveness requires continuous monitoring — annual assessments miss risk changes between review cycles."],
  ["sc8", "sc4", "Supply chain incident detection benefits from continuous vendor monitoring that surfaces breach indicators early."],

  // ===== SC6: Cloud & SaaS Supply Chain =====
  ["sc6", "be1", "SaaS supply chain risk is driven by cloud strategy — the more SaaS, the larger the supply chain surface."],
  ["sc6", "sc1", "SaaS vendor risk assessment is a TPRM function requiring adapted assessment criteria for cloud services."],
  ["sc6", "sa3", "Shared responsibility gap analysis depends on understanding cloud architecture boundaries and provider controls."],
  ["sc6", "ia3", "SaaS-to-SaaS integration risk includes OAuth token sprawl, over-permissioned integrations, and federation trust chains."],
  ["sc6", "gv3", "Policies must define SaaS security posture requirements, integration approval processes, and acceptable risk thresholds."],
  ["sc6", "dp4", "SaaS providers processing data across regions trigger cross-border data flow obligations and residency concerns."],
  ["be1", "sc6", "Cloud strategy execution depends on understanding SaaS supply chain risk and provider dependencies."],
  ["sc5", "sc6", "Concentration and fourth-party risk analysis must include SaaS provider dependencies and their upstream providers."],

  // ===== SC9: Regulatory & Compliance =====
  ["sc9", "rm2", "Supply chain regulatory requirements (DORA, NIS2, EO 14028) are compliance obligations requiring audit readiness."],
  ["sc9", "gv2", "Regulatory frameworks define supply chain security obligations — mapping them requires framework expertise."],
  ["sc9", "rm3", "Cross-border vendor obligations and regulatory compliance require legal interpretation and contract adaptation."],
  ["sc9", "sc1", "TPRM processes must incorporate regulatory requirements for vendor oversight and documentation."],
  ["sc9", "gv3", "Supply chain regulatory policies must codify obligations from CRA, DORA, NIS2, and EO 14028."],
  ["sc9", "sc2", "Software supply chain regulations (EO 14028, CRA) mandate SBOM requirements and provenance verification."],
  ["rm2", "sc9", "Compliance audits increasingly scrutinize supply chain regulatory adherence — vendor oversight is an audit focus area."],
  ["sc3", "sc9", "Procurement security requirements must reflect current regulatory obligations for vendor oversight."],

  // ===== SO6: Threat Intelligence =====
  ["so6", "so3", "Threat intelligence feeds enrich SOC detection — IOCs, TTPs, and adversary profiles improve alert triage and correlation."],
  ["so6", "so4", "Offensive security uses threat intelligence to model realistic adversary behavior in red team exercises."],
  ["so6", "gv3", "TI program policies define feed selection, sharing agreements, classification, and dissemination rules."],
  ["so6", "rm1", "Threat intelligence informs risk assessments — understanding active threat actors refines likelihood estimates."],
  ["so6", "tm5", "TI analysts need specialized skills — intelligence analysis, MITRE ATT&CK mapping, and malware reverse engineering."],
  ["so6", "tm3", "Threat intelligence requires dedicated analysts to curate, contextualize, and operationalize intelligence feeds."],
  ["so3", "so6", "SOC detection rules and hunting hypotheses are driven by threat intelligence on active campaigns and TTPs."],
  ["so1", "so6", "Prevention control tuning is informed by threat intelligence — blocking known-bad indicators at the perimeter."],

  // ===== SO7: Digital Forensics =====
  ["so7", "ir1", "Forensic capabilities are a core IR dependency — root cause analysis and evidence preservation depend on forensic readiness."],
  ["so7", "rm3", "Chain of custody, evidence preservation, and e-discovery support are legal requirements in forensic investigations."],
  ["so7", "so3", "Forensic analysis depends on SOC log retention and monitoring data — incomplete logs mean incomplete investigations."],
  ["so7", "gv3", "Forensic readiness policies define evidence handling procedures, retention requirements, and legal hold triggers."],
  ["so7", "tm5", "Digital forensics requires specialized skills — memory analysis, disk imaging, network forensics, and malware reverse engineering."],
  ["so7", "tm3", "Forensic capability requires dedicated or retainer-based specialists who are available when incidents occur."],
  ["ir1", "so7", "IR playbooks depend on forensic capability to determine incident scope, impact, and root cause."],
  ["ir6", "so7", "Post-incident analysis and blameless retrospectives depend on forensic findings for accurate timeline reconstruction."],

  // ===== SO8: Attack Surface Management =====
  ["so8", "so2", "External attack surface discovery findings feed the vulnerability management pipeline for prioritization and remediation."],
  ["so8", "so3", "Shadow IT and unknown asset discovery from ASM expands SOC monitoring scope to previously invisible infrastructure."],
  ["so8", "so1", "Attack surface reduction is a prevention activity — discovered exposures trigger hardening and decommissioning actions."],
  ["so8", "sa3", "Cloud attack surface discovery must account for ephemeral cloud resources, misconfigured storage, and exposed APIs."],
  ["so8", "gv3", "ASM policies define scanning scope, exposure classification criteria, and remediation SLAs for discovered assets."],
  ["so8", "rm1", "Attack surface findings inform risk assessments — unknown internet-facing assets represent unquantified risk exposure."],
  ["so4", "so8", "Offensive security scoping uses ASM data to identify the real external attack surface for pen testing."],
  ["so2", "so8", "Vulnerability management scope depends on ASM — you can't patch assets you don't know about."],

  // ===== IR3: Crisis Management =====
  ["ir3", "ir1", "Crisis management activates when incidents escalate beyond normal IR — it depends on the IR foundation for situational awareness."],
  ["ir3", "gv3", "Crisis protocols define activation criteria, decision authority, war room procedures, and escalation thresholds."],
  ["ir3", "ir4", "Crisis communication to stakeholders depends on the stakeholder communication framework and pre-established channels."],
  ["ir3", "rm3", "Legal counsel is embedded in crisis teams for regulatory guidance, privilege protection, and liability management."],
  ["ir3", "tm3", "Crisis teams require cross-functional participants who are trained, available, and understand their roles."],
  ["ir3", "gv4", "Crisis status and business impact feed board-level reporting for real-time executive visibility."],
  ["ir2", "ir3", "Ransomware events trigger crisis management activation — executive decision-making on payment, containment, and disclosure."],
  ["ir4", "ir3", "Stakeholder communication during major incidents is coordinated through the crisis management framework."],

  // ===== IR7: Tabletop & Simulation =====
  ["ir7", "ir1", "Tabletop exercises test and validate IR playbooks — findings drive playbook updates and gap remediation."],
  ["ir7", "so4", "Tabletop and simulation exercises are an extension of offensive security — they test defensive capabilities under controlled conditions."],
  ["ir7", "gv3", "Exercise policies define frequency requirements, scenario types, participation expectations, and after-action reporting standards."],
  ["ir7", "tm3", "Effective exercises require dedicated staff to design scenarios, facilitate sessions, and manage after-action follow-through."],
  ["ir7", "ir3", "Crisis management exercises validate executive decision frameworks and cross-functional coordination during escalated events."],
  ["ir7", "rm1", "Exercise scenarios should be informed by risk assessments — simulate the threats that matter most to the organization."],
  ["ir1", "ir7", "IR readiness depends on regular exercise validation — untested playbooks are theoretical until proven under pressure."],
  ["so3", "ir7", "SOC detection capabilities are tested during simulation exercises — purple team exercises validate alert fidelity."],

  // ===== IR8: Vulnerability Disclosure & Bug Bounty =====
  ["ir8", "so2", "Externally reported vulnerabilities flow into the vulnerability management pipeline for triage and remediation."],
  ["ir8", "rm3", "Disclosure program terms, safe harbor language, and researcher agreements require legal review and drafting."],
  ["ir8", "gv3", "Disclosure policies define scope, SLAs, safe harbor provisions, and researcher engagement rules."],
  ["ir8", "gv5", "Public vulnerability disclosure programs demonstrate trust and transparency — they invite external scrutiny."],
  ["ir8", "as1", "Reported vulnerabilities from researchers feed back into secure development practices and developer training."],
  ["ir8", "tm4", "Bug bounty programs require budget for researcher rewards, platform fees, and triage staff."],
  ["so4", "ir8", "Pen testing and bug bounty programs are complementary offensive capabilities — external researchers find what internal teams miss."],
  ["so2", "ir8", "Vulnerability management must integrate external researcher reports alongside scanner findings for complete coverage."],

  // ===== IA6: Identity Governance (IGA) =====
  ["ia6", "ia1", "Access certifications and entitlement reviews depend on accurate identity lifecycle data — you review what you know exists."],
  ["ia6", "rm2", "Compliance frameworks mandate access certifications, separation of duties, and regular entitlement reviews."],
  ["ia6", "gv3", "IGA policies define certification cycles, SoD rules, role mining cadence, and orphaned account remediation SLAs."],
  ["ia6", "ia4", "Privileged account governance is a critical IGA focus — certifying who has elevated access and why."],
  ["ia6", "so5", "Automated access certifications and orphaned account detection depend on security automation capabilities."],
  ["ia6", "rm1", "Access risk scoring from IGA feeds the enterprise risk register — over-entitled users represent quantifiable risk."],
  ["rm2", "ia6", "Audit findings frequently cite access governance gaps — IGA provides the evidence auditors need."],
  ["ia1", "ia6", "Identity lifecycle completeness depends on IGA — orphaned accounts and stale entitlements are lifecycle failures."],

  // ===== IA7: Non-Human Identities =====
  ["ia7", "ia4", "Service accounts and machine identities are privileged credentials requiring PAM controls for rotation and monitoring."],
  ["ia7", "as10", "Non-human identity credentials — API keys, tokens, and certificates — are managed through secrets management infrastructure."],
  ["ia7", "sa3", "Cloud workload identity federation enables secure machine-to-machine authentication across cloud environments."],
  ["ia7", "gv3", "Policies define service account naming conventions, ownership requirements, rotation schedules, and attestation cadence."],
  ["ia7", "ia1", "Non-human identities need lifecycle management — provisioning, ownership assignment, review, and decommissioning."],
  ["ia7", "as5", "API keys and service tokens are the authentication mechanism for machine-to-machine API communication."],
  ["ai5", "ia7", "Agentic AI systems use non-human identities — their credentials need lifecycle management and least privilege."],
  ["as8", "ia7", "Kubernetes service accounts and container workload identities are non-human identities requiring governance."],

  // ===== IA8: Customer Identity (CIAM) =====
  ["ia8", "ia2", "Customer authentication requires adapted MFA — balancing security with user experience for social login and passwordless."],
  ["ia8", "dp3", "Customer identity must respect consent — progressive profiling and data collection require consent management integration."],
  ["ia8", "dp2", "CIAM handles customer PII — privacy-by-design principles apply to registration flows and data storage."],
  ["ia8", "gv3", "CIAM policies define registration requirements, account recovery procedures, and account takeover detection thresholds."],
  ["ia8", "as5", "Customer-facing APIs depend on CIAM for authentication and authorization — OAuth flows and token management."],
  ["ia8", "so3", "Account takeover attempts and credential stuffing attacks against CIAM generate SOC detection signals."],
  ["be6", "ia8", "Customer trust portals depend on CIAM for secure, consent-aware access to trust and compliance documentation."],
  ["ia3", "ia8", "Customer SSO and social login federation is a CIAM function extending the federation architecture to external users."],

  // ===== GV6: Security Committee & Charter =====
  ["gv6", "gv1", "The security committee translates strategy into cross-functional decisions — it's the governance body for strategic execution."],
  ["gv6", "gv3", "The committee charter defines decision authority, escalation paths, and meeting cadence in organizational policy."],
  ["gv6", "tm4", "Budget allocation and investment prioritization are key committee responsibilities requiring program management input."],
  ["gv6", "gv4", "The committee reviews metrics and board reporting to make informed governance decisions."],
  ["gv6", "rm1", "Risk posture updates and risk acceptance decisions are standing committee agenda items."],
  ["gv1", "gv6", "Strategic alignment requires a governance body with cross-functional representation and decision authority."],
  ["tm4", "gv6", "Budget decisions and program investment priorities are guided by security committee governance."],

  // ===== GV7: Regulatory Intelligence =====
  ["gv7", "rm2", "Regulatory horizon scanning identifies upcoming compliance obligations before they become audit findings."],
  ["gv7", "rm3", "Legal expertise is essential for interpreting new legislation and assessing organizational impact."],
  ["gv7", "gv1", "Regulatory intelligence informs strategic planning — upcoming regulations shape the multi-year security roadmap."],
  ["gv7", "gv2", "New regulatory requirements may necessitate adopting additional frameworks or updating control mappings."],
  ["gv7", "gv3", "Proactive regulatory engagement produces policy updates before enforcement deadlines arrive."],
  ["gv7", "sc9", "Supply chain regulatory intelligence feeds directly into supply chain compliance requirements tracking."],
  ["rm2", "gv7", "Compliance readiness depends on early warning from regulatory intelligence — surprises lead to scrambles."],
  ["gv1", "gv7", "Strategy must be informed by regulatory trajectory — investing ahead of regulation creates competitive advantage."],

  // ===== GV8: Program Maturity Assessment =====
  ["gv8", "gv2", "Maturity models map to framework controls — assessment requires understanding the target framework landscape."],
  ["gv8", "gv4", "Maturity assessment outputs feed metrics and board reporting — showing progress against benchmarks."],
  ["gv8", "gv1", "Maturity gaps inform strategic priorities — the roadmap should close the most impactful capability gaps."],
  ["gv8", "rm1", "Capability gaps identified in maturity assessments represent risk — immaturity in critical areas is quantifiable risk."],
  ["gv8", "tm4", "Maturity improvement initiatives require budget for tooling, staffing, and process development."],
  ["gv8", "so4", "Offensive security findings validate or challenge maturity self-assessments with real-world evidence."],
  ["gv1", "gv8", "Strategic roadmap development depends on honest maturity assessment to set realistic improvement targets."],
  ["gv4", "gv8", "Board reporting needs maturity benchmarks to contextualize the program's position relative to peers and targets."],

  // ===== GV9: Governance-as-Code =====
  ["gv9", "as3", "Policy-as-code enforcement is embedded in DevSecOps pipelines — automated gates enforce governance in the build process."],
  ["gv9", "so5", "Automated compliance verification leverages security automation infrastructure for continuous policy enforcement."],
  ["gv9", "gv3", "Machine-readable policies must faithfully represent the organizational policy framework — code must match intent."],
  ["gv9", "gv2", "Governance-as-code maps framework controls to automated checks — NIST, CIS, and ISO controls become executable."],
  ["gv9", "sa3", "Cloud-native governance uses cloud provider policy engines — Azure Policy, AWS Config, GCP Org Policies."],
  ["gv9", "tm5", "Building and maintaining policy-as-code requires DevOps, security engineering, and policy expertise."],
  ["as3", "gv9", "DevSecOps pipeline governance depends on codified policies that can be enforced as automated gates."],
  ["so5", "gv9", "Security automation effectiveness improves when governance rules are machine-readable and version-controlled."],

  // ===== GV10: Security Evangelism =====
  ["gv10", "tm1", "Security evangelism extends awareness training into ongoing engagement — campaigns keep security top-of-mind."],
  ["gv10", "gv5", "Evangelism communicates trust and transparency commitments to internal stakeholders — making values tangible."],
  ["gv10", "gv1", "Security value communication must align with strategy — evangelism tells the story of why security matters."],
  ["gv10", "gv4", "Evangelism uses metrics to demonstrate program value — risk reduction and business enablement stories need data."],
  ["gv10", "tm6", "Culture-building initiatives reinforce trust culture — evangelism makes security a shared organizational value."],
  ["gv10", "gv6", "Committee visibility and executive briefings are evangelism channels for governance-level stakeholder engagement."],
  ["tm1", "gv10", "Awareness program effectiveness increases when sustained by ongoing evangelism and culture-building campaigns."],
  ["gv5", "gv10", "Trust as corporate value requires active evangelism — values without communication are invisible."],

  // ===== RM6: Risk Appetite & Tolerance =====
  ["rm6", "gv1", "Risk appetite is a strategic decision — the board-approved statement must align with organizational strategy."],
  ["rm6", "rm1", "Risk appetite thresholds define what level of risk is acceptable — CRQ outputs must be compared against tolerance."],
  ["rm6", "gv4", "Risk appetite breaches and tolerance trends are board reporting items requiring metrics visibility."],
  ["rm6", "gv3", "Risk acceptance criteria and escalation triggers must be codified in policy."],
  ["rm6", "gv6", "Risk appetite approval and exception decisions are security committee governance responsibilities."],
  ["rm1", "rm6", "Risk assessments are meaningless without appetite context — quantified risk must be compared against tolerance thresholds."],
  ["rm5", "rm6", "Cyber insurance coverage and retention levels are calibrated against the organization's risk appetite and tolerance."],
  ["gv1", "rm6", "Strategic planning must be bounded by risk appetite — the roadmap should not exceed tolerance thresholds."],

  // ===== RM7: Control Assurance =====
  ["rm7", "rm2", "Control testing provides audit-ready evidence that compliance controls are operating effectively, not just designed well."],
  ["rm7", "so5", "Automated evidence collection and continuous control monitoring depend on security automation infrastructure."],
  ["rm7", "gv2", "Control testing programs must map to framework requirements — testing validates framework control implementation."],
  ["rm7", "gv4", "Control effectiveness metrics feed board reporting — assurance results demonstrate governance maturity."],
  ["rm7", "gv3", "Control testing cadence, methodology, and evidence standards are defined in organizational policy."],
  ["rm7", "rm1", "Control failures identified through assurance represent risk — failed controls increase the organization's risk exposure."],
  ["rm2", "rm7", "Audit readiness depends on continuous control assurance — organizations that test controls continuously pass audits."],
  ["gv4", "rm7", "Metrics accuracy depends on control assurance — reported control effectiveness must be validated, not assumed."],

  // ===== RM8: Regulatory Examination Readiness =====
  ["rm8", "rm2", "Examination readiness is the operational manifestation of compliance — being compliant and proving it are different."],
  ["rm8", "rm7", "Control assurance provides the evidence base that examiners evaluate during regulatory examinations."],
  ["rm8", "rm3", "Legal counsel manages examiner relationships, consent order negotiations, and finding response strategy."],
  ["rm8", "gv4", "Examination findings and remediation status are board-level reporting items requiring metrics tracking."],
  ["rm8", "gv3", "Examination preparation procedures, evidence collection standards, and remediation tracking are defined in policy."],
  ["rm8", "gv2", "Examiners evaluate against specific frameworks — readiness requires understanding which framework controls apply."],
  ["rm2", "rm8", "Compliance programs must be examination-ready — passing an audit on paper differs from surviving an examiner visit."],
  ["ir5", "rm8", "Regulatory notification capabilities are tested during examinations — examiners evaluate incident reporting readiness."],

  // ===== SA6: Data Security Architecture =====
  ["sa6", "dp1", "Data security architecture depends on data classification — encryption, tokenization, and masking are applied based on sensitivity."],
  ["sa6", "sa2", "Data security layers are part of defense-in-depth — encryption at rest and in transit protect data at each tier."],
  ["sa6", "gv3", "Encryption standards, key management policies, and data masking rules are defined in organizational policy."],
  ["sa6", "gv2", "Framework controls mandate specific data security measures — NIST, PCI, and HIPAA all require encryption."],
  ["sa6", "rm2", "Data security architecture must satisfy compliance requirements — PCI encryption, HIPAA safeguards, and SOX integrity."],
  ["sa6", "as10", "Key management infrastructure depends on secrets management for storing and rotating encryption keys."],
  ["dp2", "sa6", "Privacy engineering controls like tokenization and data masking depend on data security architecture capabilities."],
  ["dp1", "sa6", "Data governance enforcement depends on data security architecture — classification without protection is just labeling."],

  // ===== SA7: Network Security Architecture =====
  ["sa7", "sa2", "Network security architecture implements defense-in-depth at the network layer — firewalls, segmentation, and inspection."],
  ["sa7", "sa1", "Zero trust network architecture extends traditional network security with identity-aware micro-segmentation."],
  ["sa7", "gv3", "Network security policies define firewall rules, segmentation requirements, DNS security standards, and NAC configurations."],
  ["sa7", "rm4", "OT network segmentation and IT/OT boundary security are network architecture decisions with safety implications."],
  ["sa7", "so3", "Network security architecture determines sensor placement for SOC monitoring — taps, flow collection, and inspection points."],
  ["sa7", "so1", "Firewall architecture and DNS security are core threat prevention controls implemented in network design."],
  ["so1", "sa7", "Threat prevention control placement depends on network security architecture — where to deploy firewalls, IPS, and DDoS protection."],
  ["rm4", "sa7", "OT network security depends on purpose-built network architecture that isolates industrial systems from corporate IT."],

  // ===== SA8: Endpoint Architecture =====
  ["sa8", "so1", "Endpoint architecture defines EDR/XDR deployment standards — the prevention and detection stack on every device."],
  ["sa8", "sa2", "Endpoint security is a defense-in-depth layer — the last line of defense when network controls fail."],
  ["sa8", "be4", "Mobile device and remote endpoint architecture must support the distributed workforce securely."],
  ["sa8", "gv3", "Endpoint hardening standards, browser isolation policies, and device compliance requirements are defined in policy."],
  ["sa8", "ia5", "Device trust signals from endpoint architecture feed zero trust access decisions — is the device compliant and healthy?"],
  ["sa8", "so3", "EDR/XDR telemetry is a primary SOC data source — endpoint architecture determines detection signal quality."],
  ["so3", "sa8", "SOC detection capability depends on endpoint architecture — EDR/XDR deployment coverage determines visibility."],
  ["as7", "sa8", "Mobile app security depends on the underlying mobile device architecture for runtime protection and isolation."],

  // ===== AI7: AI Risk Assessment =====
  ["ai7", "rm1", "AI-specific risks must integrate with the enterprise risk register — model risk is organizational risk."],
  ["ai7", "ai1", "AI risk assessment is governed by AI governance policy — the framework defines what to assess and when."],
  ["ai7", "gv2", "AI risk assessment aligns with emerging frameworks — NIST AI RMF, ISO 42001, and EU AI Act risk tiers."],
  ["ai7", "ai4", "AI system security findings from adversarial testing feed AI risk assessments with real exploitability data."],
  ["ai7", "dp2", "AI models processing personal data require privacy impact assessments as part of AI risk evaluation."],
  ["ai7", "ai3", "Shadow AI discovery findings feed AI risk assessment — unsanctioned models represent unquantified AI risk."],
  ["rm1", "ai7", "Enterprise risk management must incorporate AI-specific risk assessments as AI adoption accelerates."],
  ["ai2", "ai7", "Responsible AI commitments require AI risk assessments to identify bias, fairness, and explainability gaps."],

  // ===== AI8: AI Supply Chain & Provenance =====
  ["ai8", "sc2", "AI model supply chains need the same rigor as software supply chains — SBOMs extend to model bills of materials."],
  ["ai8", "ai1", "Model provenance and third-party model risk requirements must be defined in AI governance policy."],
  ["ai8", "sc1", "Third-party AI model providers are vendors requiring TPRM assessment for security and reliability."],
  ["ai8", "dp1", "Training data lineage requires data governance — understanding where training data came from and how it was classified."],
  ["ai8", "ai4", "Securing AI systems includes verifying model provenance — poisoned pre-trained models are an attack vector."],
  ["ai8", "gv3", "Policies define model card requirements, provenance documentation standards, and approved model sources."],
  ["sc2", "ai8", "Software supply chain practices must extend to AI model dependencies — pre-trained models are supply chain artifacts."],
  ["ai4", "ai8", "Defending AI systems requires verifying model provenance — unvetted foundation models introduce unknown vulnerabilities."],

  // ===== DP6: Privacy Program Management =====
  ["dp6", "dp1", "Privacy program effectiveness depends on data governance maturity — you protect what you understand."],
  ["dp6", "gv3", "Privacy office structure, champion responsibilities, and training requirements are defined in organizational policy."],
  ["dp6", "rm2", "Privacy program must satisfy regulatory compliance requirements — GDPR, CCPA, HIPAA privacy provisions."],
  ["dp6", "gv1", "Privacy program must align with organizational strategy — privacy as a value requires strategic commitment."],
  ["dp6", "tm1", "Privacy training programs extend security awareness to data protection topics — handling PII, consent, and rights."],
  ["dp6", "gv7", "Privacy regulatory intelligence identifies upcoming privacy legislation that the program must prepare for."],
  ["dp3", "dp6", "Consent and rights management operations depend on the privacy program structure and staffing."],
  ["dp2", "dp6", "Privacy engineering priorities and standards are set by the privacy program management function."],

  // ===== DP7: Data Breach & Incident Response =====
  ["dp7", "ir1", "Privacy-specific IR playbooks build on the broader IR capability — breach response uses the same infrastructure."],
  ["dp7", "dp1", "Breach impact assessment requires knowing what data was affected — data governance provides classification context."],
  ["dp7", "ir5", "Privacy breach notification workflows must meet regulatory timelines — GDPR 72-hour, HIPAA, and state AG requirements."],
  ["dp7", "rm3", "Legal counsel guides breach notification language, privilege considerations, and multi-jurisdiction obligations."],
  ["dp7", "dp3", "Affected individuals have rights during breaches — consent and rights management informs notification and remediation."],
  ["dp7", "gv3", "Privacy IR policies define breach classification criteria, notification triggers, and remediation procedures."],
  ["ir1", "dp7", "IR capability must include privacy-specific playbooks — data breaches have unique regulatory and notification requirements."],
  ["ir5", "dp7", "Regulatory notification depends on privacy breach assessment — the privacy IR function determines what must be reported."],

  // ===== DP8: Records Management =====
  ["dp8", "dp1", "Records management depends on data governance — retention schedules require knowing what data exists and its classification."],
  ["dp8", "rm3", "Legal hold management, e-discovery readiness, and retention obligations are legal requirements."],
  ["dp8", "gv3", "Retention schedules, disposition procedures, and archival policies are defined in organizational policy."],
  ["dp8", "rm2", "Compliance frameworks mandate specific retention periods — HIPAA 6 years, SOX 7 years, PCI 1 year."],
  ["dp8", "dp3", "Right-to-delete requests intersect with records retention — legal holds may override deletion requests."],
  ["dp8", "gv2", "Framework controls specify records management requirements — retention, protection, and disposition."],
  ["rm3", "dp8", "Legal data governance depends on records management for e-discovery readiness and legal hold enforcement."],
  ["dp1", "dp8", "Data governance lifecycle completeness depends on records management — data without disposition rules accumulates risk."],

  // ===== BE6: Customer Trust & Assurance =====
  ["be6", "gv5", "Customer trust portals are a direct manifestation of trust as corporate value — making commitments visible."],
  ["be6", "rm2", "Audit support packages include compliance certifications, SOC 2 reports, and penetration test summaries."],
  ["be6", "gv4", "Transparency reporting requires metrics — customers want quantitative evidence of security program maturity."],
  ["be6", "sc7", "Vendor transparency reporting feeds into customer-facing trust documentation and supply chain disclosures."],
  ["be6", "ia8", "Customer trust portals need secure customer identity for authenticated access to compliance documentation."],
  ["be6", "gv3", "Customer-facing security documentation standards and transparency reporting requirements are defined in policy."],
  ["gv5", "be6", "Trust as corporate value is operationalized through customer-facing trust and assurance programs."],
  ["be8", "be6", "Revenue enablement depends on customer trust assets — trust centers accelerate deal cycles and reduce friction."],

  // ===== BE7: Product Security =====
  ["be7", "as1", "Product security requires secure development practices applied to customer-facing product code."],
  ["be7", "sa4", "Product security features must be designed into the SDLC — threat modeling for customer-facing functionality."],
  ["be7", "ir8", "Product vulnerability disclosure programs enable researchers to report product-specific security issues."],
  ["be7", "as3", "Product build pipelines must include DevSecOps security gates for customer-facing releases."],
  ["be7", "so2", "Product vulnerabilities must be tracked through vulnerability management with customer-impact prioritization."],
  ["be7", "gv3", "Product security policies define security feature requirements, release criteria, and customer disclosure standards."],
  ["be6", "be7", "Customer trust depends on product security — insecure products undermine all trust and assurance efforts."],
  ["ir8", "be7", "Vulnerability disclosure programs serve product security by creating a channel for external security researchers."],

  // ===== BE8: Security as Revenue Enabler =====
  ["be8", "be6", "Revenue enablement leverages customer trust assets — trust centers, compliance docs, and audit packages."],
  ["be8", "rm2", "Security certifications (SOC 2, ISO 27001, HITRUST) are deal accelerators that compliance teams maintain."],
  ["be8", "gv5", "Security as a differentiator depends on genuine trust commitments — customers see through hollow marketing."],
  ["be8", "gv4", "Sales enablement uses security metrics to demonstrate program maturity in competitive situations."],
  ["be8", "gv3", "RFP response processes, questionnaire management workflows, and sales support policies must be defined."],
  ["be8", "tm3", "RFP and questionnaire volume requires dedicated staff — security as revenue enabler creates workload."],
  ["gv5", "be8", "Trust as corporate value creates competitive differentiation — customers prefer vendors who lead on transparency."],
  ["gv1", "be8", "Security strategy must include revenue enablement — aligning security investment with business growth objectives."],

  // ===== TM2: Security Champions Program =====
  ["tm2", "as2", "The champions program and application security champions are the same capability — program structure enables AppSec advocacy."],
  ["tm2", "tm1", "Champions program extends awareness training into sustained, team-level security advocacy and mentorship."],
  ["tm2", "tm5", "Champions need structured skills development — the program provides a training curriculum beyond general awareness."],
  ["tm2", "gv3", "Champion program policies define selection criteria, time allocation commitments, responsibilities, and recognition mechanisms."],
  ["tm2", "tm3", "Champion recruitment depends on having a talent pool of security-interested individuals across the organization."],
  ["tm2", "gv10", "Champions are security evangelists within their teams — the program operationalizes security evangelism at the team level."],
  ["as1", "tm2", "Secure development adoption scales through champions who coach and influence peers within development teams."],
  ["tm6", "tm2", "Trust culture is reinforced by security champions who model transparency and security-first behavior in every team."],

  // ===== TM7: Organizational Design =====
  ["tm7", "gv1", "Organizational structure must align with security strategy — centralized vs. federated models reflect strategic choices."],
  ["tm7", "gv3", "RACI definitions for security functions, reporting structures, and career paths are codified in organizational policy."],
  ["tm7", "tm3", "Organizational design determines hiring needs, team composition, and career pathing that retention depends on."],
  ["tm7", "tm4", "Team structure decisions have direct budget implications — headcount, spans of control, and organizational layers."],
  ["tm7", "gv6", "CISO reporting structure and security committee representation are organizational design decisions."],
  ["tm7", "rm1", "Risk-informed organizational design ensures that high-risk areas receive proportional security staffing and attention."],
  ["gv1", "tm7", "Strategy execution depends on organizational design — the wrong structure prevents even the best strategy from working."],
  ["tm3", "tm7", "Talent retention depends on clear career paths and organizational structure that creates growth opportunities."],

  // ===== TM8: Stakeholder Engagement =====
  ["tm8", "gv1", "Stakeholder engagement ensures security strategy reflects business priorities and maintains executive support."],
  ["tm8", "gv4", "Communication cadence and executive briefings depend on metrics that demonstrate program value and progress."],
  ["tm8", "gv6", "Cross-functional working groups and committee representation are stakeholder engagement channels."],
  ["tm8", "gv5", "Trust building with stakeholders requires consistent engagement — trust erodes without regular communication."],
  ["tm8", "tm6", "Effective stakeholder engagement depends on trust culture — transparent communication builds lasting partnerships."],
  ["tm8", "gv3", "Engagement cadence, communication formats, and escalation paths are defined in organizational policy."],
  ["gv1", "tm8", "Strategic alignment requires ongoing stakeholder engagement — strategy without buy-in doesn't get funded or executed."],
  ["gv4", "tm8", "Metrics reporting is a stakeholder engagement activity — dashboards and briefings maintain executive awareness."],
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

  // ===== New Standards Entries =====
  ir3: [
    { std: "NIST 800-53", ref: "IR-1, IR-4, IR-7, PM-15", note: "Incident response policy, incident handling, incident response assistance, and contacts with security groups for crisis coordination." },
    { std: "NIST CSF 2.0", ref: "RS.MA, RS.CO, GV.RR", note: "Incident management, incident response reporting/communication, and roles and responsibilities during crisis events." },
    { std: "DORA", ref: "Art. 11(1)-(3), Art. 17", note: "ICT response and recovery policies, activation of crisis management functions, and major ICT-related incident management." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.1, 12.10.3", note: "Incident response plan with roles and responsibilities, and designation of specific personnel for 24/7 incident handling." },
    { std: "HIPAA", ref: "§164.308(a)(6)(i)", note: "Security incident procedures — implement policies and procedures for responding to suspected or known security incidents." },
  ],
  ir7: [
    { std: "NIST 800-53", ref: "IR-3, IR-3(2), CP-4, AT-2(1)", note: "Incident response testing, coordination with related plans, contingency plan testing, and practical exercises." },
    { std: "NIST CSF 2.0", ref: "ID.IM-02, RS.MA", note: "Security tests and exercises inform improvements, and incident management procedures tested and validated." },
    { std: "DORA", ref: "Art. 11(6), Art. 25, Art. 26", note: "Testing of ICT business continuity plans, testing of ICT tools and systems, and advanced threat-led penetration testing." },
    { std: "PCI DSS 4.0", ref: "Req 12.10.2", note: "Incident response plan tested at least annually through tabletop or simulated exercises." },
    { std: "HIPAA", ref: "§164.308(a)(7)(ii)(D)", note: "Testing and revision procedures — implement procedures for periodic testing of contingency plans." },
  ],
  ir8: [
    { std: "NIST 800-53", ref: "PM-15, SI-5, RA-5, SA-11", note: "Contacts with security groups and associations, security alerts/advisories, vulnerability monitoring, and developer testing." },
    { std: "NIST CSF 2.0", ref: "ID.RA-01, RS.CO", note: "Asset vulnerabilities identified through internal and external reports, and response activities communicated to stakeholders." },
    { std: "PCI DSS 4.0", ref: "Req 6.3.1", note: "Security vulnerabilities identified and managed including through external vulnerability reporting programs." },
    { std: "DORA", ref: "Art. 13(4)", note: "Learning and evolving from ICT-related incidents and vulnerabilities discovered through testing and external reports." },
  ],
  so6: [
    { std: "NIST 800-53", ref: "PM-16, RA-3(2), RA-5(10), SI-5", note: "Threat awareness program, emerging threats, correlating scanning information, and security alerts/advisories." },
    { std: "NIST CSF 2.0", ref: "ID.RA-02, ID.RA-03", note: "Cyber threat intelligence received from information sharing forums, and internal and external threats identified." },
    { std: "DORA", ref: "Art. 13(1)-(3)", note: "Learning and evolving including capabilities to gather information on vulnerabilities, cyber threats, and ICT-related incidents." },
    { std: "HIPAA", ref: "§164.308(a)(1)(ii)(A)", note: "Risk analysis including identification of threats — threat intelligence informs ongoing risk assessment." },
  ],
  so7: [
    { std: "NIST 800-53", ref: "IR-4, AU-9, AU-11, IR-10", note: "Incident handling including forensic activities, protection of audit information, audit record retention, and integrated analysis team." },
    { std: "NIST CSF 2.0", ref: "RS.AN-03, RS.AN-06", note: "Forensic analysis performed and actions taken are recorded to support future investigation and response." },
    { std: "DORA", ref: "Art. 11(2)(d)", note: "Response procedures including forensic analysis and preservation of digital evidence for ICT-related incidents." },
    { std: "HIPAA", ref: "§164.308(a)(6)(ii)", note: "Incident response and reporting including investigation of security incidents affecting ePHI." },
  ],
  so8: [
    { std: "NIST 800-53", ref: "CM-8, RA-5, PM-5, SA-9", note: "System component inventory, vulnerability monitoring, information system inventory, and external system services." },
    { std: "NIST CSF 2.0", ref: "ID.AM-01, ID.AM-02, ID.RA-01", note: "Inventories of hardware, software, and services managed; and asset vulnerabilities identified." },
    { std: "DORA", ref: "Art. 8(1)-(4)", note: "Identification of all ICT-supported business functions, information assets, and ICT dependencies." },
    { std: "PCI DSS 4.0", ref: "Req 11.3, 12.5.2", note: "External vulnerability scanning and PCI DSS scope documented including all discovered assets." },
  ],
  ia6: [
    { std: "NIST 800-53", ref: "AC-2(3), AC-2(13), AC-5, AC-6(7)", note: "Account review, disable inactive accounts, separation of duties, and review of user privileges." },
    { std: "NIST CSF 2.0", ref: "PR.AA-03, PR.AA-05", note: "User authentication and access permissions managed, provisioned, and reviewed." },
    { std: "HIPAA", ref: "§164.308(a)(3)(ii)(B), §164.308(a)(4)(ii)(C)", note: "Termination procedures and access establishment/modification — periodic access review." },
    { std: "PCI DSS 4.0", ref: "Req 7.2.4, 7.2.5, 8.6.1", note: "Review user accounts and access privileges periodically, and manage application/system accounts." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Access rights policies and procedures including periodic recertification and segregation of duties." },
  ],
  ia7: [
    { std: "NIST 800-53", ref: "IA-3, IA-4, IA-9, SC-12, SC-17", note: "Device identification/authentication, identifier management, service identification, cryptographic key management, and PKI certificates." },
    { std: "NIST CSF 2.0", ref: "PR.AA-01, PR.AA-03", note: "Identity management and authentication for devices and workloads alongside human identities." },
    { std: "PCI DSS 4.0", ref: "Req 8.6", note: "Application and system accounts managed with proper authentication and access controls." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Access policies covering automated processes and service accounts with appropriate controls." },
  ],
  ia8: [
    { std: "NIST 800-53", ref: "IA-8, IA-12, AC-7, AC-10", note: "Identification/authentication of non-organizational users, identity proofing, unsuccessful logon attempts, and concurrent session control." },
    { std: "GDPR", ref: "Art. 5(1)(a-c), Art. 6, Art. 7, Art. 25", note: "Lawfulness/fairness/transparency, lawful basis for processing, conditions for consent, and data protection by design." },
    { std: "NIST CSF 2.0", ref: "PR.AA-01, PR.AA-02, PR.AA-03", note: "Identity management, identity proofing bound to credentials, and authentication for customer-facing systems." },
    { std: "PCI DSS 4.0", ref: "Req 8.3.10, 8.4", note: "Service provider customer-facing authentication and MFA for access to cardholder environments." },
    { std: "CCPA/CPRA", ref: "§1798.100, §1798.120, §1798.135", note: "Right to know, right to opt-out, and methods for exercising consumer rights in identity context." },
  ],
  gv6: [
    { std: "NIST 800-53", ref: "PM-1, PM-2, PM-10", note: "Information security program plan, senior information security officer, and authorization process with governance structure." },
    { std: "NIST CSF 2.0", ref: "GV.RR-01, GV.RR-02", note: "Organizational leadership for cybersecurity risk management and roles/responsibilities established." },
    { std: "DORA", ref: "Art. 5(1)-(2), Art. 5(9)", note: "Internal governance and control framework with management body responsibility, and internal audit requirements." },
    { std: "PCI DSS 4.0", ref: "Req 12.1, 12.4", note: "Information security policy established with management accountability and responsibility assignments." },
    { std: "HIPAA", ref: "§164.308(a)(2)", note: "Assigned security responsibility — a security official must be designated to develop and implement policies." },
  ],
  gv7: [
    { std: "NIST 800-53", ref: "PM-1, PM-10, PM-31, SA-22", note: "Information security program plan, authorization process, continuous monitoring strategy, and unsupported system components." },
    { std: "NIST CSF 2.0", ref: "GV.OC-03, ID.IM-02", note: "Legal/regulatory/contractual requirements understood, and stakeholders informed of improvements." },
    { std: "DORA", ref: "Art. 5(1), Art. 6(5)", note: "ICT risk management framework kept up to date with regulatory developments and latest ICT security practices." },
    { std: "GDPR", ref: "Art. 35, Art. 36", note: "Data protection impact assessment and prior consultation — proactive engagement with regulatory changes." },
  ],
  gv8: [
    { std: "NIST 800-53", ref: "CA-2, CA-7, PM-6", note: "Control assessments, continuous monitoring, and measures of performance to assess program maturity." },
    { std: "NIST CSF 2.0", ref: "ID.IM-01, ID.IM-02, ID.IM-03, ID.IM-04", note: "Improvements identified from evaluations, assessments, exercises, and changes." },
    { std: "DORA", ref: "Art. 5(6), Art. 6(5)", note: "Reporting to management body on ICT risk management and keeping framework current." },
    { std: "PCI DSS 4.0", ref: "Req 12.4", note: "Managing PCI DSS compliance with periodic reviews and accountability at executive level." },
  ],
  gv9: [
    { std: "NIST 800-53", ref: "SA-10, CM-3, CM-6, SI-7", note: "Developer configuration management, configuration change control, configuration settings, and software/firmware integrity." },
    { std: "NIST CSF 2.0", ref: "GV.PO-01, GV.PO-02, PR.PS-01", note: "Policy established and communicated, policy reviewed/updated, and configuration management practices applied." },
    { std: "DORA", ref: "Art. 9(1)-(2)", note: "ICT protection and prevention including automated mechanisms for security management." },
    { std: "PCI DSS 4.0", ref: "Req 1.2.5, 2.2, 6.5", note: "Network security controls configured, system components configured securely, and changes managed." },
  ],
  gv10: [
    { std: "NIST 800-53", ref: "AT-2, AT-3, PM-13, PM-14", note: "Literacy training and awareness, role-based training, information security workforce, and testing/training/monitoring." },
    { std: "NIST CSF 2.0", ref: "GV.OC-01, GV.RR-04", note: "Organizational mission understood and informing risk management, and adequate cybersecurity resources." },
    { std: "DORA", ref: "Art. 13(6)", note: "Compulsory security awareness programs and digital operational resilience training for all staff." },
  ],
  rm6: [
    { std: "NIST 800-53", ref: "PM-9, RA-3, PM-28", note: "Risk management strategy including risk tolerance, risk assessment guiding acceptance decisions, and risk framing." },
    { std: "NIST CSF 2.0", ref: "GV.RM-01, GV.RM-02, GV.RM-07", note: "Risk management objectives established, risk appetite and tolerance communicated, and strategic opportunities recognized." },
    { std: "DORA", ref: "Art. 6(8)(a)-(b)", note: "Management body defines and approves digital operational resilience strategy including risk appetite for ICT risk." },
  ],
  rm7: [
    { std: "NIST 800-53", ref: "CA-2, CA-5, CA-7, CA-9", note: "Control assessments, plan of action and milestones, continuous monitoring, and internal system connections." },
    { std: "NIST CSF 2.0", ref: "ID.IM-01, ID.IM-02, ID.IM-03", note: "Improvements identified from evaluations, security tests, and operational experience." },
    { std: "DORA", ref: "Art. 5(9)-(10), Art. 24", note: "Internal audit of ICT risk management framework and advanced testing of ICT tools and systems." },
    { std: "PCI DSS 4.0", ref: "Req 12.4, 12.5.2", note: "PCI DSS compliance management and scope validation including control effectiveness." },
  ],
  rm8: [
    { std: "NIST 800-53", ref: "CA-2, CA-6, CA-7, PM-9", note: "Control assessments, authorization, continuous monitoring, and risk management strategy supporting examination readiness." },
    { std: "NIST CSF 2.0", ref: "GV.OC-03, ID.IM-01", note: "Legal/regulatory/contractual requirements understood and improvements identified from evaluations." },
    { std: "DORA", ref: "Art. 5(9), Art. 19, Art. 24", note: "Internal ICT audit, reporting to competent authorities, and advanced testing demonstrating examination preparedness." },
    { std: "HIPAA", ref: "§164.308(a)(8), §164.316", note: "Evaluation through periodic assessments and documentation maintenance supporting HHS examination." },
  ],
  sa6: [
    { std: "NIST 800-53", ref: "SC-8, SC-12, SC-13, SC-28, MP-5", note: "Transmission confidentiality/integrity, cryptographic key management, cryptographic protection, data at rest, and media transport." },
    { std: "HIPAA", ref: "§164.312(a)(2)(iv), §164.312(e)(2)(ii)", note: "Encryption and decryption of ePHI and encryption of ePHI in transit." },
    { std: "PCI DSS 4.0", ref: "Req 3.5, 3.6, 3.7, 4.1", note: "PAN rendered unreadable, cryptographic key management, key operations, and strong cryptography for transmission." },
    { std: "DORA", ref: "Art. 9(2)", note: "ICT security tools including encryption and cryptographic techniques for data protection." },
  ],
  sa7: [
    { std: "NIST 800-53", ref: "SC-7, SC-8, SC-20, SC-21, SC-22, AC-4", note: "Boundary protection, transmission integrity, secure name resolution, recursive resolver, architecture for resolution, and information flow." },
    { std: "PCI DSS 4.0", ref: "Req 1.2, 1.3, 1.4, 1.5", note: "Network security controls configured, network access restricted, and controls between cardholder and wireless networks." },
    { std: "DORA", ref: "Art. 9(2)", note: "Network security management including segregation, segmentation, and securing interconnections." },
  ],
  sa8: [
    { std: "NIST 800-53", ref: "SC-7, SI-3, SI-4, SC-18, CM-6, CM-7", note: "Boundary protection at endpoint, malware protection, endpoint monitoring, mobile code, configuration settings, and least functionality." },
    { std: "PCI DSS 4.0", ref: "Req 2.2, 5.2, 5.3, 5.4", note: "System components configured securely, malware detected/addressed, anti-malware active, and anti-phishing mechanisms." },
    { std: "DORA", ref: "Art. 9(1)-(2)", note: "ICT protection and prevention including endpoint protection measures and secure configuration." },
  ],
  ai7: [
    { std: "NIST AI RMF", ref: "Map 1-5, Measure 1-4, Manage 1-4", note: "Full AI risk mapping, measurement of AI trustworthiness characteristics, and AI risk management and response." },
    { std: "NIST 800-53", ref: "RA-1, RA-2, RA-3, RA-5, CA-7", note: "Risk assessment policy, security categorization, risk assessment, vulnerability monitoring, and continuous monitoring." },
    { std: "GDPR", ref: "Art. 35, Art. 36", note: "Data protection impact assessment and prior consultation — required for high-risk automated processing." },
    { std: "DORA", ref: "Art. 6, Art. 8", note: "ICT risk management framework and identification of risks — AI systems as ICT components requiring risk assessment." },
  ],
  ai8: [
    { std: "NIST 800-161", ref: "SA-12, SR-3, SR-4, SR-11", note: "Supply chain protection, supply chain controls, provenance, and component authenticity for AI model supply chain." },
    { std: "NIST AI RMF", ref: "Govern 1.6, Map 1.1, Map 4, Manage 3", note: "AI system provenance documentation, context for AI dependencies, and managing third-party AI risks." },
    { std: "NIST 800-53", ref: "SR-1, SR-2, SR-3, SA-9, CM-8", note: "Supply chain risk management policy, plan, controls, external services, and component inventory." },
    { std: "DORA", ref: "Art. 28(3), Art. 28(8)", note: "ICT third-party risk assessment and monitoring sub-outsourcing chains — AI model providers as ICT third parties." },
  ],
  sc3: [
    { std: "NIST 800-53", ref: "SA-4, SA-9, SR-1, SR-5", note: "Acquisition process, external information system services, supply chain risk management policy, and acquisition strategies." },
    { std: "HIPAA", ref: "§164.308(b)(1), §164.314(a)(1)", note: "Business associate contracts and organizational requirements ensuring security provisions in agreements." },
    { std: "PCI DSS 4.0", ref: "Req 12.8.1, 12.8.2, 12.8.3", note: "List of service providers, written agreements, and established process for engaging service providers." },
    { std: "DORA", ref: "Art. 28(1)-(5), Art. 30", note: "General principles for ICT third-party risk management and key contractual provisions." },
  ],
  sc4: [
    { std: "NIST 800-53", ref: "CA-7, SR-6, RA-3(1)", note: "Continuous monitoring, supplier assessments and reviews, and supply chain risk assessment on an ongoing basis." },
    { std: "DORA", ref: "Art. 28(3), Art. 28(7)", note: "Assessment of ICT concentration risk and ongoing monitoring of third-party service provider performance." },
    { std: "PCI DSS 4.0", ref: "Req 12.8.4, 12.8.5", note: "Monitor service providers' PCI DSS compliance status and maintain information about provider responsibilities." },
  ],
  sc6: [
    { std: "NIST 800-53", ref: "SA-9, SR-1, AC-20", note: "External information system services, supply chain risk management, and use of external systems — cloud/SaaS context." },
    { std: "DORA", ref: "Art. 28(1), Art. 29, Art. 30", note: "ICT third-party risk principles, preliminary assessment of concentration risk, and contractual provisions for cloud." },
    { std: "PCI DSS 4.0", ref: "Req 12.8, 12.9", note: "Third-party service provider management and acknowledgement of responsibilities for cloud/SaaS providers." },
  ],
  sc9: [
    { std: "NIST 800-53", ref: "SR-1, SR-2, SA-9, PM-30", note: "Supply chain risk management policy, plan, external system services, and supply chain risk management strategy." },
    { std: "NIST 800-161", ref: "Full document", note: "C-SCRM practices providing the framework for meeting federal and regulatory supply chain security requirements." },
    { std: "DORA", ref: "Art. 28-44", note: "Complete ICT third-party risk management chapter — principles, contracts, oversight, and critical provider designation." },
    { std: "GDPR", ref: "Art. 28, Art. 44-49", note: "Processor obligations and international transfer requirements — cross-border vendor compliance." },
  ],
  dp6: [
    { std: "GDPR", ref: "Art. 37-39, Art. 24, Art. 39(1)(b)", note: "DPO designation, qualifications, and tasks including monitoring compliance, providing advice, and staff training." },
    { std: "NIST 800-53", ref: "PM-1, PM-3, PM-18, PT-1", note: "Information security program plan, resources, privacy program plan, and PII processing policy and procedures." },
    { std: "HIPAA", ref: "§164.308(a)(2), §164.308(a)(5)", note: "Assigned security responsibility and security awareness and training for workforce members." },
  ],
  dp7: [
    { std: "GDPR", ref: "Art. 33, Art. 34", note: "Notification of personal data breach to supervisory authority within 72 hours and communication to data subjects." },
    { std: "HIPAA", ref: "§164.404, §164.406, §164.408", note: "Individual notification, media notification for breaches affecting 500+, and notification to HHS Secretary." },
    { std: "NIST 800-53", ref: "IR-1 thru IR-6, PT-1", note: "Incident response policy and procedures, incident handling, reporting, and PII processing policy." },
    { std: "CCPA/CPRA", ref: "§1798.150, §1798.82", note: "Private right of action for data breaches and notification requirements for unauthorized access." },
    { std: "DORA", ref: "Art. 17, Art. 19", note: "Major ICT-related incident management and reporting to competent authorities." },
  ],
  dp8: [
    { std: "NIST 800-53", ref: "AU-11, MP-6, SI-12, MP-1", note: "Audit record retention, media sanitization, information management and retention, and media protection policy." },
    { std: "HIPAA", ref: "§164.316(b)(2), §164.310(d)(2)(i-ii)", note: "Documentation retention for six years and device/media disposal and re-use requirements." },
    { std: "PCI DSS 4.0", ref: "Req 3.1, 3.2, 9.4", note: "Data retention and disposal processes, sensitive authentication data not stored, and media physically secured." },
    { std: "GDPR", ref: "Art. 5(1)(e), Art. 17, Art. 30", note: "Storage limitation principle, right to erasure, and records of processing activities." },
  ],
  as2: [
    { std: "NIST 800-53", ref: "AT-3, PM-2, PM-13, PM-14", note: "Role-based training, senior information security officer, information security workforce, and testing/training/monitoring." },
    { std: "NIST CSF 2.0", ref: "GV.RR-02, GV.RR-04", note: "Roles and responsibilities for cybersecurity and adequate resources including skilled personnel." },
    { std: "PCI DSS 4.0", ref: "Req 6.2.2, 12.6", note: "Personnel developing software trained in secure coding and security awareness education." },
    { std: "DORA", ref: "Art. 13(6)", note: "Compulsory ICT security awareness and training programmes for staff and management." },
  ],
  as4: [
    { std: "NIST 800-53", ref: "RA-3, RA-5, SA-8, SA-11(2)", note: "Risk assessment, vulnerability monitoring, security engineering principles, and threat modeling as part of developer testing." },
    { std: "NIST CSF 2.0", ref: "ID.RA-01, ID.RA-03, ID.RA-04", note: "Asset vulnerabilities identified, internal/external threats identified, and potential impacts assessed." },
    { std: "PCI DSS 4.0", ref: "Req 6.2.2, 6.5.1", note: "Software development personnel trained in identifying common attacks and change control processes." },
    { std: "DORA", ref: "Art. 8(3)", note: "Identification of all sources of ICT risk including threat scenarios assessment." },
  ],
  as7: [
    { std: "NIST 800-53", ref: "AC-19, SC-8, SC-13, SC-28", note: "Access control for mobile devices, transmission confidentiality/integrity, cryptographic protection, and data at rest." },
    { std: "PCI DSS 4.0", ref: "Req 2.2, 4.2, 6.2", note: "Secure system configuration for mobile, strong cryptography over open networks, and secure development practices." },
    { std: "DORA", ref: "Art. 9(1)-(2)", note: "Protection and prevention including encryption, network security, and detection on mobile channels." },
  ],
  as8: [
    { std: "NIST 800-53", ref: "CM-2, CM-6, CM-7, SI-3, SI-7, SC-7", note: "Baseline configuration, configuration settings, least functionality, malware protection, software integrity, and boundary protection." },
    { std: "PCI DSS 4.0", ref: "Req 2.2, 6.2, 6.3", note: "Secure system configuration, secure software development, and vulnerability management for containers." },
    { std: "NIST CSF 2.0", ref: "PR.PS-01, PR.PS-02, PR.DS-08", note: "Configuration management, software maintenance, and integrity verification of hardware/software." },
  ],
  as10: [
    { std: "NIST 800-53", ref: "IA-5, SC-12, SC-17, SC-28", note: "Authenticator management, cryptographic key establishment/management, PKI certificates, and protection of information at rest." },
    { std: "PCI DSS 4.0", ref: "Req 3.5, 3.6, 3.7, 8.3, 8.6", note: "PAN protection, cryptographic key management, operational key management, strong authentication, and system account management." },
    { std: "DORA", ref: "Art. 9(4)(c)", note: "Strong authentication mechanisms and control measures to protect authentication credentials and cryptographic keys." },
  ],
  as11: [
    { std: "NIST 800-53", ref: "SA-10, SA-15, CM-5, SI-7, CM-14", note: "Developer configuration management, development process/standards, access restrictions for change, software integrity, and signed components." },
    { std: "PCI DSS 4.0", ref: "Req 6.2, 6.5", note: "Bespoke software developed securely and changes to system components managed with proper controls." },
    { std: "NIST CSF 2.0", ref: "PR.DS-08, PR.PS-01", note: "Integrity of hardware and software verified and configuration management applied to dev environments." },
  ],
  be6: [
    { std: "NIST CSF 2.0", ref: "GV.OC-02, GV.SC-03", note: "Internal and external stakeholders understand and manage cybersecurity expectations and supply chain risk." },
    { std: "GDPR", ref: "Art. 12, Art. 13, Art. 14", note: "Transparent information, communication, and modalities for data subject rights — transparency obligations." },
    { std: "PCI DSS 4.0", ref: "Req 12.9", note: "Third-party service providers acknowledge responsibility for cardholder data security — customer assurance." },
  ],
  be7: [
    { std: "NIST 800-53", ref: "SA-3, SA-8, SA-11, SA-15, SA-17", note: "System development lifecycle, security engineering principles, developer testing, development process/standards, and security design." },
    { std: "NIST CSF 2.0", ref: "PR.PS-06", note: "Secure software development practices integrated and performance monitored." },
    { std: "PCI DSS 4.0", ref: "Req 6.2, 6.3, 6.5", note: "Bespoke software developed securely, vulnerabilities addressed, and public-facing web app protection." },
  ],
  be8: [
    { std: "NIST CSF 2.0", ref: "GV.OC-02", note: "Internal and external stakeholders understand cybersecurity expectations — enabling commercial relationships." },
    { std: "PCI DSS 4.0", ref: "Req 12.9, Req 12.8", note: "TPSP responsibility acknowledgment and managing third-party relationships — compliance as sales prerequisite." },
  ],
  tm2: [
    { std: "NIST 800-53", ref: "AT-3, PM-13, PM-14", note: "Role-based training, information security workforce development, and insider threat program — champions as force multipliers." },
    { std: "NIST CSF 2.0", ref: "GV.RR-02, GV.RR-04", note: "Roles and responsibilities established and communicated, and adequate resources — people with needed skills." },
    { std: "DORA", ref: "Art. 13(6)", note: "Compulsory ICT security training programmes — champions extend training reach across the organization." },
  ],
  tm7: [
    { std: "NIST 800-53", ref: "PM-1, PM-2, PM-13", note: "Information security program plan, senior information security officer, and information security workforce." },
    { std: "NIST CSF 2.0", ref: "GV.RR-01, GV.RR-02", note: "Organizational leadership establishes cybersecurity roles and responsibilities and communicates them." },
    { std: "DORA", ref: "Art. 5(2), Art. 5(4)", note: "Management body defines, approves, and oversees ICT risk management and allocates adequate resources." },
  ],
  tm8: [
    { std: "NIST CSF 2.0", ref: "GV.OC-02, GV.RR-02", note: "Internal and external stakeholders understand cybersecurity expectations, and roles/responsibilities established." },
    { std: "NIST 800-53", ref: "PM-1, PM-2, PL-1", note: "Information security program plan, senior information security officer, and planning policy." },
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
    { role: "IT Operations / Infrastructure", why: "Owns the systems being tested — must coordinate maintenance windows, scope boundaries, and avoid production impact during engagements." },
    { role: "Software Engineering / DevOps", why: "Application and API penetration testing requires developer engagement for vulnerability triage, remediation, and retest validation." },
  ],
  so5: [
    { role: "IT Operations / DevOps", why: "Automated patching, IaC security, and SOAR integrations touch production systems that IT/DevOps manages." },
    { role: "Finance", why: "Automation tooling (SOAR, SIEM, ML infrastructure) represents significant recurring investment requiring financial oversight." },
    { role: "Data Engineering / Analytics", why: "ML model pipelines and data feeds for security analytics may share data infrastructure." },
    { role: "SOC Analysts / Threat Detection Team", why: "Primary beneficiaries and operators of SOAR playbooks and automated detection — their workflows are transformed by automation." },
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
  // ===== New Stakeholder Entries =====
  ir3: [
    { role: "Executive Leadership / C-Suite", why: "Makes high-stakes decisions during crisis — business continuity trade-offs, external disclosure, and resource allocation under pressure." },
    { role: "General Counsel / Legal", why: "Provides real-time legal guidance on liability, privilege, regulatory obligations, and communication boundaries during crisis." },
    { role: "Communications / PR", why: "Manages media inquiries, public statements, and employee communications — controls the narrative during active crisis." },
    { role: "HR / People Operations", why: "Supports employee communication, manages workforce impact, and handles safety/wellbeing concerns during extended crisis events." },
  ],
  ir7: [
    { role: "Executive Leadership / C-Suite", why: "Participates in executive-level tabletops testing strategic decision-making and crisis communication under simulated pressure." },
    { role: "General Counsel / Legal", why: "Exercises legal decision-making in simulations — notification timing, privilege considerations, and regulator communication." },
    { role: "IT Operations / Engineering", why: "Participates in live-fire simulations and technical exercises validating containment, eradication, and recovery procedures." },
    { role: "Business Unit Leaders", why: "Exercises business continuity decisions and cross-functional coordination in simulated incident scenarios." },
  ],
  ir8: [
    { role: "Software Engineering / Product Security", why: "Receives, triages, and remediates externally reported vulnerabilities — the primary consumer of disclosure program output." },
    { role: "General Counsel / Legal", why: "Defines safe harbor provisions, manages researcher agreements, and ensures disclosure program compliance with applicable law." },
    { role: "Communications / PR", why: "Coordinates public disclosure of vulnerabilities including CVE publication, blog posts, and customer notification." },
    { role: "Product Management", why: "Prioritizes vulnerability fixes against product roadmap and coordinates customer-facing patch release communication." },
  ],
  so6: [
    { role: "SOC Analysts / Security Engineers", why: "Primary consumers of threat intelligence — use IOCs, TTPs, and threat actor profiles to write detection rules and investigate alerts." },
    { role: "Executive Leadership / CISO", why: "Consumes strategic intelligence on threat landscape trends to inform risk decisions, board reporting, and program prioritization." },
    { role: "IT Operations / Infrastructure", why: "Implements blocking actions based on threat intelligence — firewall rules, DNS sinkholing, and IP blocklists." },
    { role: "Industry Peers / ISAC Partners", why: "Bidirectional intelligence sharing requires active participation in sector ISACs and trusted sharing communities." },
  ],
  so7: [
    { role: "General Counsel / Legal", why: "Directs forensic investigations involving litigation, regulatory inquiries, or law enforcement — privilege and admissibility are legal concerns." },
    { role: "HR / Employee Relations", why: "Insider threat investigations require HR coordination for employee rights, due process, and disciplinary actions." },
    { role: "Law Enforcement / External Counsel", why: "Criminal investigations require forensic evidence that meets evidentiary standards — chain of custody is critical." },
    { role: "IT Operations / Infrastructure", why: "Provides access to systems, log sources, and network infrastructure needed for forensic evidence collection." },
  ],
  so8: [
    { role: "IT Operations / Infrastructure", why: "Owns the infrastructure where discovered assets live — remediation of exposed services and shadow IT requires IT action." },
    { role: "Cloud Engineering / Platform Teams", why: "Cloud resources are a primary source of attack surface sprawl — platform teams manage the cloud accounts being discovered." },
    { role: "Software Engineering / DevOps", why: "Development teams may deploy internet-facing services outside security review — ASM findings drive secure deployment practices." },
    { role: "Procurement / Vendor Management", why: "Shadow SaaS and unauthorized vendor tools discovered by ASM require procurement governance and risk assessment." },
  ],
  ia6: [
    { role: "Internal Audit", why: "Access certifications and SoD enforcement are primary audit focus areas — IGA provides the evidence trail auditors examine." },
    { role: "Business Unit Managers", why: "Certify access for their teams during campaigns and define business context for role mining and entitlement decisions." },
    { role: "Compliance Officer", why: "Regulatory requirements (SOX, HIPAA, PCI) mandate access reviews — compliance tracks certification completion and SoD violations." },
    { role: "HR / People Operations", why: "Employee lifecycle events trigger IGA workflows — transfers and reorganizations create the access changes that governance must catch." },
  ],
  ia7: [
    { role: "DevOps / Platform Engineering", why: "Creates and manages the majority of non-human identities — service accounts, API keys, and CI/CD credentials are their daily tools." },
    { role: "Cloud Engineering", why: "Workload identity federation and managed identities are cloud-native constructs that cloud teams architect and maintain." },
    { role: "IT Operations / Infrastructure", why: "Manages infrastructure service accounts, scheduled task credentials, and system-to-system authentication across on-premises environments." },
    { role: "Internal Audit", why: "Non-human identity sprawl is an emerging audit concern — auditors need inventory completeness and rotation evidence." },
  ],
  ia8: [
    { role: "Product / Engineering", why: "Builds and maintains customer-facing authentication flows — registration, login, and account recovery are product features." },
    { role: "Customer Experience / UX", why: "Customer identity friction directly impacts conversion and retention — UX teams design the authentication experience." },
    { role: "Privacy Officer / DPO", why: "Customer registration collects personal data — consent management and data minimization are privacy obligations embedded in CIAM." },
    { role: "Marketing", why: "Progressive profiling and social login enable marketing personalization — CIAM capabilities directly support customer engagement strategy." },
  ],
  gv6: [
    { role: "CEO / Executive Leadership", why: "Chairs or sponsors the committee — executive authority is required for cross-functional security governance decisions." },
    { role: "General Counsel / Legal", why: "Legal representation ensures committee decisions account for regulatory obligations, liability, and contractual commitments." },
    { role: "Business Unit Leaders", why: "Cross-functional representation requires business leaders who bring operational context to security investment and risk decisions." },
    { role: "CISO / Security Leadership", why: "Presents risk posture, recommends actions, and drives the committee agenda with actionable security intelligence." },
  ],
  gv7: [
    { role: "General Counsel / Legal", why: "Interprets new legislation, assesses organizational applicability, and advises on compliance strategy and timelines." },
    { role: "Compliance Officer", why: "Translates regulatory intelligence into compliance requirements, gap assessments, and implementation roadmaps." },
    { role: "Government Affairs / Regulatory", why: "Maintains relationships with regulators, participates in comment periods, and provides early warning on enforcement trends." },
    { role: "Privacy Officer / DPO", why: "Privacy regulations evolve rapidly — the DPO tracks GDPR, CCPA, and emerging privacy legislation globally." },
  ],
  gv8: [
    { role: "CISO / Security Leadership", why: "Owns program maturity outcomes — assessment results drive strategic planning and investment prioritization." },
    { role: "Internal Audit", why: "Validates maturity self-assessments through independent testing and provides objective capability evaluation." },
    { role: "Executive Leadership / Board", why: "Maturity benchmarks contextualize the program's position for governance oversight and investment decisions." },
    { role: "External Assessors", why: "Third-party assessments provide credibility and objectivity that internal self-assessments cannot achieve alone." },
  ],
  gv9: [
    { role: "DevOps / Platform Engineering", why: "Implements and maintains policy-as-code in CI/CD pipelines — governance-as-code lives in their infrastructure." },
    { role: "Security Engineering", why: "Translates security policies into machine-readable rules and maintains the policy code library." },
    { role: "Compliance Officer", why: "Validates that codified policies accurately represent regulatory requirements and organizational standards." },
    { role: "Cloud Engineering", why: "Cloud-native policy engines (AWS Config, Azure Policy, GCP Org Policies) are managed by cloud teams." },
  ],
  gv10: [
    { role: "Communications / Internal Comms", why: "Owns internal communication channels and helps design campaigns that resonate with diverse employee audiences." },
    { role: "Marketing / Brand", why: "Security evangelism extends to external audiences — marketing amplifies trust and security brand messaging." },
    { role: "Executive Leadership", why: "Executive visibility and endorsement gives security evangelism credibility and organizational weight." },
    { role: "HR / Learning & Development", why: "Evangelism complements formal training — L&D integrates ongoing security engagement into development programs." },
  ],
  rm6: [
    { role: "Board of Directors", why: "Approves the risk appetite statement and holds ultimate accountability for ensuring risk-taking aligns with organizational strategy." },
    { role: "Enterprise Risk Management", why: "Translates board-level risk appetite into operational tolerance thresholds and integrates cyber risk into the enterprise framework." },
    { role: "CFO / Finance", why: "Risk tolerance has direct financial implications — loss thresholds, insurance adequacy, and capital reserve decisions depend on appetite." },
    { role: "Business Unit Leaders", why: "Must operate within defined risk tolerances — their strategic initiatives and technology decisions are constrained by risk appetite." },
  ],
  rm7: [
    { role: "Internal Audit", why: "Primary consumer of control assurance outputs — audit relies on control testing results and evidence for their own assessments." },
    { role: "IT Operations / Engineering", why: "Operates the systems where controls are implemented — they must maintain controls and respond to control failures." },
    { role: "Compliance Officer", why: "Uses control assurance data to demonstrate regulatory compliance and prepare for external audits and examinations." },
    { role: "External Auditors", why: "Rely on control testing evidence and continuous monitoring outputs to inform their assessment opinions." },
  ],
  rm8: [
    { role: "General Counsel / Legal", why: "Manages regulatory relationships, reviews examination responses for legal risk, and oversees consent order compliance." },
    { role: "Compliance Officer", why: "Leads examination preparation, coordinates evidence gathering across the organization, and tracks finding remediation." },
    { role: "Executive Leadership / C-Suite", why: "Regulators expect direct engagement with senior leadership — executives must be briefed and available for examiner requests." },
    { role: "Internal Audit", why: "Pre-examination assessments identify gaps before regulators arrive, and audit tracks remediation of prior findings." },
  ],
  sa6: [
    { role: "Data Engineering / Database Administration", why: "Manages databases and data pipelines where encryption, masking, and access controls must be implemented." },
    { role: "Enterprise Architecture", why: "Data security architecture must integrate with enterprise data platforms, cloud strategy, and application patterns." },
    { role: "Privacy Officer / DPO", why: "Tokenization, masking, and encryption directly support privacy-by-design and data protection regulatory obligations." },
    { role: "Compliance Officer", why: "Encryption and key management are explicit regulatory requirements across PCI, HIPAA, and GDPR that must be evidenced." },
  ],
  sa7: [
    { role: "Network Engineering", why: "Designs, deploys, and operates network infrastructure — firewall rules, segmentation, and SD-WAN are their daily work." },
    { role: "IT Operations", why: "Manages network availability and troubleshoots connectivity issues caused by security controls." },
    { role: "Enterprise Architecture", why: "Network security architecture must align with the broader technology architecture and digital transformation roadmap." },
  ],
  sa8: [
    { role: "IT Operations / Desktop Engineering", why: "Manages endpoint fleet — deploys agents, maintains hardening baselines, and handles device provisioning and decommissioning." },
    { role: "End Users / All Employees", why: "Directly impacted by endpoint controls — performance, usability, and BYOD policies affect their daily work experience." },
    { role: "SOC Analysts / Security Engineers", why: "Consume EDR/XDR telemetry for threat detection and investigation — endpoint architecture determines detection quality." },
  ],
  ai7: [
    { role: "Risk Management / ERM", why: "AI risk must integrate with enterprise risk management — AI-specific risks feed into the organizational risk register." },
    { role: "Data Science / ML Engineering", why: "Owns model validation, drift detection implementation, and technical risk assessment for AI systems." },
    { role: "Internal Audit", why: "Validates AI risk assessment completeness, model validation independence, and alignment with governance requirements." },
    { role: "General Counsel / Legal", why: "AI risk assessments must account for regulatory exposure, liability from AI failures, and emerging AI legislation." },
  ],
  ai8: [
    { role: "Data Science / ML Engineering", why: "Selects, integrates, and fine-tunes third-party models — directly responsible for model provenance documentation." },
    { role: "Procurement / Vendor Management", why: "AI model vendor contracts must include provenance requirements, licensing terms, and supply chain security obligations." },
    { role: "General Counsel / Legal", why: "Training data licensing, IP ownership of fine-tuned models, and liability for third-party model outputs require legal review." },
    { role: "Software Engineering / DevOps", why: "Integrates AI models into applications and pipelines — responsible for model versioning and dependency management in production." },
  ],
  sc3: [
    { role: "Procurement / Vendor Management", why: "Owns the procurement process — security requirements must be embedded in RFPs and evaluation criteria." },
    { role: "General Counsel / Legal", why: "Negotiates and reviews contract security language, liability clauses, and breach notification obligations." },
    { role: "Business Unit Leaders", why: "Sponsor vendor engagements and must accept residual risk when security requirements cannot be fully met." },
    { role: "Finance", why: "Security requirements in procurement may increase vendor costs — finance balances security investment with budget constraints." },
  ],
  sc4: [
    { role: "Procurement / Vendor Management", why: "Owns vendor relationships and acts on monitoring signals — escalating risk changes and triggering reassessments." },
    { role: "IT Operations / Security Engineering", why: "Manages vendor security monitoring tooling, integrates risk feeds, and validates technical signal accuracy." },
    { role: "Business Continuity", why: "Vendor risk degradation signals feed into continuity planning — emerging vendor risk may require contingency activation." },
  ],
  sc6: [
    { role: "IT Operations / Cloud Engineering", why: "Manages cloud provider relationships, configures SaaS platforms, and implements shared responsibility controls." },
    { role: "Enterprise Architecture", why: "Cloud and SaaS architecture decisions determine supply chain exposure — platform selection shapes dependency risk." },
    { role: "Procurement", why: "Cloud and SaaS contracts require specific security provisions, data residency terms, and exit strategy clauses." },
    { role: "Business Unit Leaders", why: "SaaS adoption decisions often originate in business units — they must understand integration risk and shared responsibility." },
  ],
  sc9: [
    { role: "General Counsel / Legal", why: "Interprets regulatory obligations, drafts compliant contract language, and advises on cross-border vendor legal exposure." },
    { role: "Compliance / Regulatory Affairs", why: "Tracks regulatory changes (CRA, NIS2, DORA), maps requirements to supply chain practices, and manages examination readiness." },
    { role: "Procurement / Vendor Management", why: "Implements regulatory requirements in vendor contracts and ensures supply chain compliance at the operational level." },
    { role: "Government Affairs", why: "Engages with regulators on emerging supply chain legislation and represents organizational interests in policy development." },
  ],
  dp6: [
    { role: "Privacy Officer / DPO", why: "Leads the privacy program — sets strategy, manages the team, and serves as the regulatory point of contact." },
    { role: "Executive Leadership / C-Suite", why: "Sponsors the privacy program, allocates budget, and ensures organizational commitment to privacy compliance." },
    { role: "HR / Learning & Development", why: "Integrates privacy training into organizational learning programs and tracks workforce completion." },
    { role: "General Counsel / Legal", why: "Provides legal interpretation of privacy regulations and ensures program alignment with evolving obligations." },
  ],
  dp7: [
    { role: "Privacy Officer / DPO", why: "Leads breach assessment, determines notification obligations, and coordinates regulatory reporting across jurisdictions." },
    { role: "General Counsel / Legal", why: "Advises on notification obligations, manages privilege, and coordinates with external breach counsel." },
    { role: "Communications / PR", why: "Manages public-facing breach communications, customer notifications, and media responses." },
    { role: "IT Operations / Security", why: "Performs technical investigation, containment, and forensic analysis to determine breach scope and root cause." },
  ],
  dp8: [
    { role: "General Counsel / Legal", why: "Defines retention requirements from regulatory and litigation obligations and authorizes legal hold issuance and release." },
    { role: "Records Management / Compliance", why: "Operationalizes retention schedules, manages disposition workflows, and maintains the records inventory." },
    { role: "IT Operations", why: "Implements technical retention policies, manages archival storage infrastructure, and executes certified destruction." },
    { role: "Business Unit Leaders", why: "Identify records within their domains, comply with legal holds, and validate retention schedule applicability." },
  ],
  as2: [
    { role: "Software Engineering / Development", why: "Champions are selected from development teams — their peers benefit from embedded security guidance." },
    { role: "Engineering Managers", why: "Must allocate time for champion activities and support the program as part of team objectives." },
    { role: "HR / Learning & Development", why: "Champion training programs and recognition align with career development and organizational learning frameworks." },
  ],
  as4: [
    { role: "Software Architects / Tech Leads", why: "Own system architecture decisions and provide the technical context required for meaningful threat models." },
    { role: "Software Engineering / Development", why: "Participate in threat modeling sessions and implement mitigations identified during design reviews." },
    { role: "Product Management", why: "New features and architectural changes trigger threat modeling — product teams must plan for security review time." },
  ],
  as7: [
    { role: "Mobile Engineering Teams", why: "Build and maintain mobile applications — they implement certificate pinning, secure storage, and platform-specific controls." },
    { role: "Product Management", why: "Mobile security features (biometrics, app permissions) are product decisions affecting user experience and app store compliance." },
    { role: "QA / Testing", why: "Mobile security testing requires device farms, OS version coverage, and platform-specific test scenarios." },
  ],
  as8: [
    { role: "Platform Engineering / DevOps", why: "Builds and operates container orchestration platforms — security policies must integrate with their deployment workflows." },
    { role: "Cloud Engineering / SRE", why: "Manages Kubernetes clusters, service mesh, and serverless infrastructure where security controls are enforced." },
    { role: "Software Engineering", why: "Writes Dockerfiles, Kubernetes manifests, and serverless functions — security starts with how containers are built." },
  ],
  as10: [
    { role: "Software Engineering / DevOps", why: "Consumes secrets in applications and pipelines — vault integration and secret rotation directly impact development workflows." },
    { role: "Platform Engineering / SRE", why: "Operates secrets management infrastructure, vault clusters, and certificate automation platforms." },
    { role: "IT Operations", why: "Manages service account credentials, infrastructure secrets, and certificate renewals across the environment." },
  ],
  as11: [
    { role: "Software Engineering / Development", why: "Works within the development environment daily — security controls must protect without impeding developer productivity." },
    { role: "DevOps / Platform Engineering", why: "Owns build systems, artifact registries, and CI/CD infrastructure that must be secured and maintained." },
    { role: "IT Operations / Endpoint Engineering", why: "Manages developer workstation configurations, endpoint protection, and privileged access for development use cases." },
  ],
  be6: [
    { role: "Sales / Business Development", why: "Trust artifacts directly enable deal closure — security documentation is a recurring sales cycle dependency." },
    { role: "Customer Success / Account Management", why: "Manages ongoing customer security review requests, questionnaire responses, and relationship-level trust activities." },
    { role: "Marketing", why: "Trust center and transparency reporting are marketing assets that differentiate the organization in the market." },
    { role: "General Counsel / Legal", why: "Reviews customer-facing security claims for accuracy, liability exposure, and contractual alignment." },
  ],
  be7: [
    { role: "Product Management", why: "Owns the product roadmap — security features compete with functional features for prioritization and delivery." },
    { role: "Software Engineering / Development", why: "Implements security controls in the product codebase and responds to product vulnerability findings." },
    { role: "Customer Success / Support", why: "Communicates product security capabilities to customers and handles security-related support escalations." },
    { role: "Sales / Business Development", why: "Product security features are competitive differentiators — sales teams articulate security value to prospects." },
  ],
  be8: [
    { role: "Sales / Business Development", why: "Primary consumer of security enablement — security posture directly impacts deal velocity and close rates." },
    { role: "Marketing", why: "Positions security certifications and trust artifacts as competitive differentiators in market-facing content." },
    { role: "Finance / CFO", why: "Certification investments must demonstrate ROI through measurable impact on revenue and deal acceleration." },
    { role: "Customer Success", why: "Ongoing security assurance drives customer retention, upsell opportunities, and contract renewals." },
  ],
  tm2: [
    { role: "Engineering Managers / Department Heads", why: "Approve champion participation, allocate time for security activities, and reinforce the champion role within their teams." },
    { role: "HR / Learning & Development", why: "Integrates champion training into L&D programs and tracks professional development credit for participants." },
    { role: "Software Engineering / Development", why: "Primary talent pool for champions — developers volunteer time and bring security practices back to their teams." },
    { role: "Executive Leadership", why: "Champions program requires executive sponsorship for resourcing, visibility, and organizational legitimacy." },
  ],
  tm7: [
    { role: "Executive Leadership / CEO", why: "Determines CISO reporting line and organizational placement — the most consequential design decision for the security program." },
    { role: "CIO / Technology Organization", why: "Organizational design determines how security and IT collaborate — reporting structures shape working relationships." },
    { role: "HR / People Operations", why: "Owns organizational design governance, job architecture, compensation bands, and career framework standards." },
    { role: "Board of Directors", why: "Board oversight expectations influence CISO independence, reporting frequency, and organizational authority." },
  ],
  tm8: [
    { role: "Executive Leadership / C-Suite", why: "Primary engagement targets — executive support determines security program funding, authority, and organizational influence." },
    { role: "Business Unit Leaders", why: "Security must understand and serve business objectives — unit leaders define what security enables or constrains." },
    { role: "Board of Directors", why: "Board engagement requires tailored communication, risk-focused briefings, and governance-level reporting." },
    { role: "Communications / Internal Comms", why: "Partners on messaging strategy, communication channels, and ensuring security communications reach the right audiences." },
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
const EXPANDED_RADIUS = 450;
const CHILD_DISTANCE = 155;
const getAngle = (i) => (360 / count) * i - 90;
const getChildSpread = (n, isExpanded) => {
  if (isExpanded) {
    const maxTotal = 180;
    return Math.min(30, maxTotal / (n - 1));
  }
  const mx = 360 / count - 4; const id = 28; return (n - 1) * id > mx ? mx / (n - 1) : id;
};

function computeBranchPositions(expandedId) {
  const positions = {};
  FRAMEWORK.children.forEach((branch, i) => {
    const angle = getAngle(i);
    const r = branch.id === expandedId ? EXPANDED_RADIUS : OUTER_RADIUS;
    positions[branch.id] = polarToCart(CX, CY, r, angle);
  });
  return positions;
}

function computeChildPositions(expandedId, branchPositions) {
  const positions = {};
  FRAMEWORK.children.forEach((branch, i) => {
    const angle = getAngle(i);
    const pos = branchPositions[branch.id];
    const isExp = branch.id === expandedId;
    const n = branch.children.length;
    const baseDist = isExp ? 200 : CHILD_DISTANCE;
    const stagger = isExp ? 110 : 0;
    const spread = getChildSpread(n, isExp);
    branch.children.forEach((child, ci) => {
      const cAngle = angle - ((n - 1) * spread) / 2 + ci * spread;
      const dist = baseDist + (ci % 2 === 0 ? 0 : stagger);
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

function CurvedLine({ x1, y1, x2, y2, color, animated, delay = 0, opacity: opacityOverride }) {
  const dx = x2 - x1, dy = y2 - y1;
  const cx = (x1 + x2) / 2 - dy * 0.15, cy = (y1 + y2) / 2 + dx * 0.15;
  const op = opacityOverride != null ? opacityOverride : (animated ? 0.8 : 0.15);
  return <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke={color} strokeWidth={animated ? 2 : 1.5} fill="none" opacity={op} style={{ transition: "all 0.3s ease-in-out", ...(animated ? { strokeDasharray: "6 4", animation: `dashFlow 1.5s linear infinite`, animationDelay: `${delay}s` } : {}) }} />;
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

  const [expandedSettled, setExpandedSettled] = useState(false);
  const toggleBranch = useCallback((id) => { setExpanded((p) => (p === id ? null : id)); setSelected(null); setExpandedSettled(false); }, []);
  useEffect(() => { if (expanded) { const t = setTimeout(() => setExpandedSettled(true), 320); return () => clearTimeout(t); } else { setExpandedSettled(false); } }, [expanded]);
  const branchPositions = useMemo(() => computeBranchPositions(expanded), [expanded]);
  const childPositions = useMemo(() => computeChildPositions(expanded, branchPositions), [expanded, branchPositions]);
  const handleWheel = useCallback((e) => { e.preventDefault(); setZoom((z) => Math.max(0.3, Math.min(3, z * (e.deltaY > 0 ? 1.08 : 0.92)))); }, []);
  useEffect(() => { const el = svgRef.current; if (el) { el.addEventListener("wheel", handleWheel, { passive: false }); return () => el.removeEventListener("wheel", handleWheel); } }, [handleWheel]);

  const sW = viewBox.w * zoom, sH = viewBox.h * zoom;
  const vb = `${viewBox.x - (sW - viewBox.w) / 2} ${viewBox.y - (sH - viewBox.h) / 2} ${sW} ${sH}`;

  const handlePointerDown = (e) => { if (e.button === 0) { setIsPanning(true); setPanStart({ x: e.clientX, y: e.clientY }); } };
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
      {/* Subtle background watermark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "45vmin", height: "45vmin", backgroundImage: "url(/sidekick-logo.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", pointerEvents: "none", zIndex: 5, animation: "watermarkPulse 6s ease-in-out infinite" }} />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes watermarkPulse { 0%,100%{opacity:0.01}50%{opacity:0.03} }
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
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00a2e8", boxShadow: "0 0 10px #00a2e8", animation: "pulseGlow 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'Bank Gothic', 'BankGothic Md BT', sans-serif", fontSize: 12, letterSpacing: 3, color: "#00a2e8", textTransform: "uppercase" }}>Sidekick Security — Trust & Transparency Framework</span>
        </div>
        <h1 style={{ margin: "2px 0", fontSize: 22, fontWeight: 700, color: "#F1F5F9", letterSpacing: -0.5 }}>Integrated Trust Program Architecture</h1>
        <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>
          {count} domains · {FRAMEWORK.children.reduce((s, b) => s + b.children.length, 0)} capabilities · {DEP_EDGES.length} dependencies · {Object.keys(STANDARDS_MAP).length} standards-mapped
        </p>
        <div style={{ pointerEvents: "auto", marginTop: 6, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input type="text" placeholder="Search capabilities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 260, padding: "8px 12px", background: "rgba(30,41,59,0.9)", border: "1px solid #334155", borderRadius: 7, color: "#F1F5F9", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "#F59E0B")} onBlur={(e) => (e.target.style.borderColor = "#334155")}
          />
          {selected && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2.5, borderRadius: 1, background: "#38BDF8", display: "inline-block" }} /><span style={{ fontSize: 12, color: "#64748B" }}>depends on ({selDeps?.upstream.length})</span></span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2.5, borderRadius: 1, background: "#FB923C", display: "inline-block" }} /><span style={{ fontSize: 12, color: "#64748B" }}>depended by ({selDeps?.downstream.length})</span></span>
              <span style={{ fontSize: 12, color: "#475569" }}>({totalDeps} total connections)</span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ position: "absolute", top: 112, right: 14, zIndex: 10, background: "rgba(15,23,42,0.88)", border: "1px solid #1e293b", borderRadius: 10, padding: "10px 14px", backdropFilter: "blur(12px)", maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#64748B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Domains</div>
        {FRAMEWORK.children.map((b) => {
          const dimLegend = selected && connectedBranches.size > 0 && !connectedBranches.has(b.id);
          return (
            <div key={b.id} onClick={() => toggleBranch(b.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", marginBottom: 2, borderRadius: 5, cursor: "pointer", background: expanded === b.id ? `${b.color}15` : "transparent", opacity: isFiltering && !matchingBranches.has(b.id) ? 0.25 : dimLegend ? 0.3 : 1, transition: "all 0.2s" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: b.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: expanded === b.id ? "#F1F5F9" : "#94A3B8", fontWeight: expanded === b.id ? 600 : 400, whiteSpace: "nowrap" }}>{b.label.replace(/\n/g, " ")}</span>
            </div>
          );
        })}
      </div>

      {/* Zoom Controls */}
      <div style={{ position: "absolute", bottom: 18, right: 18, zIndex: 15, display: "flex", flexDirection: "column", gap: 4 }}>
        <button onClick={() => setZoom((z) => Math.max(0.3, z * 0.92))} title="Zoom in"
          style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #334155", background: "rgba(15,23,42,0.9)", color: "#F1F5F9", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", lineHeight: 1 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(30,41,59,0.95)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(15,23,42,0.9)")}>+</button>
        <button onClick={() => setZoom((z) => Math.min(3, z * 1.08))} title="Zoom out"
          style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #334155", background: "rgba(15,23,42,0.9)", color: "#F1F5F9", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", lineHeight: 1 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(30,41,59,0.95)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(15,23,42,0.9)")}>−</button>
      </div>

      {/* Detail Panel */}
      {selected && selDeps && (
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 20, maxWidth: 760, margin: "0 auto", background: "rgba(15,23,42,0.97)", border: `1px solid ${branchColorMap[childToBranch[selected.id]]}44`, borderRadius: 12, backdropFilter: "blur(20px)", animation: "fadeSlideIn 0.3s ease", maxHeight: "42vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 20px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: branchColorMap[childToBranch[selected.id]], letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{branchLabelMap[childToBranch[selected.id]]}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9" }}>{selected.label}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "1px solid #334155", borderRadius: 6, color: "#94A3B8", cursor: "pointer", padding: "3px 10px", fontSize: 13 }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 1, marginTop: 8, borderBottom: "1px solid #1e293b", overflowX: "auto", scrollbarWidth: "none" }}>
              {[{ key: "info", label: "Overview" }, { key: "upstream", label: `Depends On (${selDeps.upstream.length})` }, { key: "downstream", label: `Depended By (${selDeps.downstream.length})` }, { key: "standards", label: `Standards (${(STANDARDS_MAP[selected.id] || []).length})` }, { key: "stakeholders", label: `Stakeholders (${(STAKEHOLDERS_MAP[selected.id] || []).length})` }].map((tab) => (
                <button key={tab.key} onClick={() => setDepTab(tab.key)} style={{ background: depTab === tab.key ? "rgba(255,255,255,0.06)" : "transparent", border: "none", borderBottom: depTab === tab.key ? "2px solid #F59E0B" : "2px solid transparent", color: depTab === tab.key ? "#F1F5F9" : "#64748B", padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: "10px 20px 14px", overflowY: "auto", flex: 1 }}>
            {depTab === "info" && (
              <div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#94A3B8", margin: 0 }}>{selected.desc}</p>
                {selected.children && selected.children.length > 0 && (
                  <>
                    <div style={{ height: 1, background: "#1e293b", margin: "10px 0" }} />
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#64748B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Key Practices</div>
                    {selected.children.map((sub, i) => (
                      <div key={i} style={{ padding: "5px 8px", marginBottom: 3, borderLeft: "2px solid #334155", borderRadius: 2 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0", marginBottom: 2 }}>{sub.label}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: "#94A3B8" }}>{sub.desc}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
            {depTab === "upstream" && (selDeps.upstream.length === 0 ? <p style={{ fontSize: 13, color: "#475569", margin: 0, fontStyle: "italic" }}>No upstream dependencies mapped.</p> :
              selDeps.upstream.map((dep, i) => (
                <div key={`u${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 3, borderLeft: `3px solid ${dep.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: dep.color }}>{dep.label}</span>
                    <span style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>· {dep.branch}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: "#94A3B8", margin: 0 }}>{dep.reason}</p>
                </div>
              ))
            )}
            {depTab === "downstream" && (selDeps.downstream.length === 0 ? <p style={{ fontSize: 13, color: "#475569", margin: 0, fontStyle: "italic" }}>No downstream dependencies mapped.</p> :
              selDeps.downstream.map((dep, i) => (
                <div key={`d${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 3, borderLeft: `3px solid ${dep.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: dep.color }}>{dep.label}</span>
                    <span style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>· {dep.branch}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: "#94A3B8", margin: 0 }}>{dep.reason}</p>
                </div>
              ))
            )}
            {depTab === "standards" && (() => {
              const stds = STANDARDS_MAP[selected.id] || [];
              if (stds.length === 0) return <p style={{ fontSize: 13, color: "#475569", margin: 0, fontStyle: "italic" }}>No standards mapped for this capability.</p>;
              return stds.map((s, i) => (
                <div key={`s${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 4, borderLeft: `3px solid ${STD_COLORS[s.std] || "#64748B"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: STD_COLORS[s.std] || "#94A3B8", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 0.5, textTransform: "uppercase" }}>{s.std}</span>
                    <span style={{ fontSize: 11, color: "#F1F5F9", fontFamily: "'JetBrains Mono',monospace", background: "rgba(255,255,255,0.06)", padding: "2px 7px", borderRadius: 3 }}>{s.ref}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: "#94A3B8", margin: 0 }}>{s.note}</p>
                </div>
              ));
            })()}
            {depTab === "stakeholders" && (() => {
              const sth = STAKEHOLDERS_MAP[selected.id] || [];
              if (sth.length === 0) return <p style={{ fontSize: 13, color: "#475569", margin: 0, fontStyle: "italic" }}>No stakeholders mapped for this capability.</p>;
              return sth.map((s, i) => (
                <div key={`sh${i}`} className="dep-item" style={{ padding: "6px 8px", marginBottom: 4, borderLeft: "3px solid #94A3B8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0" }}>{s.role}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: "#94A3B8", margin: 0 }}>{s.why}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* SVG */}
      <svg ref={svgRef} viewBox={vb} style={{ width: "100%", height: "100%", display: "block" }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
        <defs>
          <radialGradient id="centerGlow"><stop offset="0%" stopColor="#00a2e8" stopOpacity="0.12" /><stop offset="100%" stopColor="#00a2e8" stopOpacity="0" /></radialGradient>
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
        {FRAMEWORK.children.map((b, i) => { const isCon = selected && connectedBranches.has(b.id); const dimLine = selected && !isCon && expanded !== b.id; const filterDim = isFiltering && !matchingBranches.has(b.id); return <g key={`l${b.id}`} opacity={filterDim ? 0.1 : 1} style={{ transition: "opacity 0.3s ease-in-out" }}><CurvedLine x1={CX} y1={CY} x2={branchPositions[b.id].x} y2={branchPositions[b.id].y} color={b.color} animated={expanded === b.id || hoveredBranch === b.id} delay={i * 0.1} opacity={dimLine ? 0.05 : undefined} /></g>; })}

        {/* Child lines */}
        {FRAMEWORK.children.map((b, i) => { if (expanded !== b.id) return null; const pos = branchPositions[b.id]; return b.children.map((c, ci) => { const cP = childPositions[c.id]; const isSel = selected?.id === c.id; const isDep = selected && connectedIds.has(c.id); const dimChild = selected && !isSel && !isDep; const filterDim = isFiltering && !matchingIds.has(c.id); return <g key={`cl${c.id}`} opacity={!expandedSettled ? 0 : filterDim ? 0.1 : 1} style={{ transition: "opacity 0.3s ease-in-out" }}><CurvedLine x1={pos.x} y1={pos.y} x2={cP.x} y2={cP.y} color={b.color} animated delay={ci * 0.06} opacity={dimChild ? 0.08 : undefined} /></g>; }); })}

        {/* Branch nodes */}
        {FRAMEWORK.children.map((b, i) => {
          const pos = branchPositions[b.id]; const isExp = expanded === b.id; const isHov = hoveredBranch === b.id;
          const dimmed = isFiltering && !matchingBranches.has(b.id);
          const isCon = selected && connectedBranches.has(b.id);
          const shouldDim = selected && !isCon && !isExp;
          return (
            <g key={b.id} opacity={dimmed ? 0.1 : shouldDim ? 0.2 : 1} style={{ transition: "opacity 0.3s ease-in-out" }}>
              <g style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.3s ease-in-out" }}>
                {(isExp || isHov || isCon) && <circle cx={0} cy={0} r={55} fill={`url(#glow-${b.id})`} />}
                <g style={{ cursor: "pointer" }} onClick={() => toggleBranch(b.id)} onMouseEnter={() => setHoveredBranch(b.id)} onMouseLeave={() => setHoveredBranch(null)}>
                  <rect x={-54} y={-32} width={108} height={64} rx={10} fill={isExp ? `${b.color}18` : "#111827"} stroke={b.color} strokeWidth={isExp || isCon ? 2 : 1} opacity={isExp || isHov || isCon ? 1 : 0.7} />
                  <text x={0} y={-8} textAnchor="middle" style={{ fontSize: 16, pointerEvents: "none" }}>{b.icon}</text>
                  {b.label.split("\n").map((l, li) => <text key={li} x={0} y={8 + li * 12} textAnchor="middle" fill={isExp || isCon ? "#F1F5F9" : "#94A3B8"} style={{ fontSize: 9, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.3, transition: "fill 0.4s ease-in-out" }}>{l}</text>)}
                </g>
              </g>
              {isExp && b.children.map((c, ci) => {
                const cP = childPositions[c.id];
                const isSel = selected?.id === c.id; const dimC = isFiltering && !matchingIds.has(c.id);
                const isDep = selected && connectedIds.has(c.id);
                const shouldDimC = selected && !isSel && !isDep;
                return (
                  <g key={c.id} opacity={!expandedSettled ? 0 : dimC ? 0.1 : shouldDimC ? 0.25 : 1} style={{ transition: "opacity 0.3s ease-in-out" }}>
                    <g style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); setSelected(c); }}>
                      <rect x={cP.x - 68} y={cP.y - 14} width={136} height={28} rx={7} fill={isSel ? `${b.color}30` : isDep ? "rgba(255,255,255,0.06)" : "#0f172a"} stroke={isSel ? "#F59E0B" : isDep ? "#F59E0B" : b.color} strokeWidth={isSel ? 2 : isDep ? 1.2 : 0.5} style={{ transition: "all 0.3s ease-in-out" }} />
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
          <circle cx={CX} cy={CY} r={52} fill="#0f172a" stroke="#00a2e8" strokeWidth={2} filter="url(#softGlow)" />
          <circle cx={CX} cy={CY} r={58} fill="none" stroke="#00a2e8" strokeWidth={0.5} opacity={0.3} />
          <text x={CX} y={CY - 12} textAnchor="middle" fill="#00a2e8" style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Bank Gothic','BankGothic Md BT',sans-serif", letterSpacing: 1.5 }}>TRUST &</text>
          <text x={CX} y={CY + 2} textAnchor="middle" fill="#00a2e8" style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Bank Gothic','BankGothic Md BT',sans-serif", letterSpacing: 1.5 }}>TRANSPARENCY</text>
          <text x={CX} y={CY + 16} textAnchor="middle" fill="#94A3B8" style={{ fontSize: 8, fontWeight: 500, fontFamily: "'Bank Gothic','BankGothic Md BT',sans-serif", letterSpacing: 0.5 }}>PROGRAM</text>
        </g>
      </svg>
    </div>
  );
}
