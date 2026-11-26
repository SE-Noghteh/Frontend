/*
 * Zedlancer - C4 model (Structurizr DSL)
 *
 * Shared model (keep identical in Frontend and Backend repos) + per-repo component views.
 * Views: SystemContext, Containers, WorkspaceComponents (frontend), Production (deployment).
 * The backend team adds its component view(s) for the Backend API container.
 *
 * Render locally:
 *   docker run -it --rm -p 8080:8080 -v "$(pwd)":/usr/local/structurizr structurizr/lite
 * then open http://localhost:8080
 */
workspace "Zedlancer" "Platform that manages work opportunities, earning and skill growth for teens and young adults (15-22)." {

    !identifiers hierarchical

    model {
        applicant = person "Applicant (15-22)" "Teen or young adult who builds a skill passport, applies for opportunities and delivers work. Users aged 15-17 require parental consent."
        parent    = person "Parent / Guardian" "Links to a teen account, approves or withdraws consent and monitors activity."
        employer  = person "Employer" "Business or individual that posts opportunities, selects applicants and reviews deliverables."
        admin     = person "Platform Admin" "Verifies user documents, moderates opportunities, handles safety reports and resolves disputes."

        sms = softwareSystem "SMS Provider" "Delivers OTP / verification codes and important notifications by SMS." "External"
        kyc = softwareSystem "Identity Inquiry Provider" "KYC service for national code, mobile ownership and civil-registry checks. Mocked in the academic version." "External"

        zed = softwareSystem "Zedlancer Platform" "Manages the full collaboration cycle: posting, applying, parental consent, agreement, delivery, evaluation and skill history." {

            web = container "Frontend Web Server" "Serves the static Vite build (dist/) on port 3000." "Docker, Node 20 + serve"

            spa = container "Web Application (SPA)" "Role-based RTL Persian UI for applicants, parents, employers and admins." "React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, Zustand, TanStack Query" "Browser" {

                group "Workspace feature" {
                    page   = component "WorkspacePage" "Route /dashboard/workspace/:projectId. Loads the project and renders the tabbed layout." "src/pages/Workspace/WorkspacePage.tsx"
                    perm   = component "useWorkspacePermissions" "Derives allowed actions from the role in userStore and the project status. UX only - the server is authoritative." "src/hooks"
                    store  = component "workspaceStore" "Active tab, persisted message drafts, unread counters, typing users, socket status." "Zustand - src/store"
                    chat   = component "ChatPanel" "Messages, attachments, unread badge, typing and read receipts." "React - src/components/Workspace"
                    deliv  = component "DeliverablesPanel" "Submit outputs (Formik + Yup), request revisions, accept delivery." "React - src/components/Workspace"
                    tasks  = component "TaskBoard" "Tasks, milestones, deadlines and activity timeline." "React - src/components/Workspace"
                    agree  = component "AgreementPanel" "Current agreement version, change requests, pause / cancel actions." "React - src/components/Workspace"
                    rt     = component "useWorkspaceSocket" "Subscribes to project events and maps them to query-cache and store updates." "src/hooks"
                    hooks  = component "Workspace queries & mutations" "useQuery / useMutation with src/queryKeys/workspace.ts; invalidation, sonner toasts, translateAxiosError." "TanStack Query"
                    api    = component "Workspace services" "getMessagesService, sendMessageService, submitDeliverableService ... built on getData / postData." "src/services/Workspace"
                    upload = component "uploadFileService" "Gets a pre-signed URL, then PUTs the file to MinIO with progress and size/type checks." "src/services/Workspace"
                }

                group "Shared infrastructure" {
                    socket = component "socketClient" "Single shared WebSocket, token handshake, reconnect with backoff, channel subscriptions." "src/services/socket.ts"
                    http   = component "apiClient + request helpers" "getData / postData / patchData / deleteData; Bearer token from userStore; refresh on 401." "Axios - src/services/services.ts"
                }
            }

            backend = container "Backend API" "REST/JSON (/api/v1) + WebSocket hub (/ws), OpenAPI docs. Enforces roles, consent and access on every request." "Go, Gin (modular monolith)"
            storage = container "File Storage" "Profile images, chat attachments, deliverables and identity documents (private bucket)." "MinIO (S3-compatible)" "Storage"
            db      = container "Database" "Users, opportunities, agreements, messages, simulated transactions, audit log." "PostgreSQL" "Database"
        }

        # ---- Context level ----
        applicant -> zed "Searches & applies, collaborates, delivers" "HTTPS"
        parent    -> zed "Links account, gives consent" "HTTPS"
        employer  -> zed "Posts opportunities, reviews deliverables" "HTTPS"
        admin     -> zed "Verifies documents, moderates & resolves disputes" "HTTPS"

        # ---- Container level ----
        applicant -> zed.spa "Uses" "HTTPS"
        parent    -> zed.spa "Uses" "HTTPS"
        employer  -> zed.spa "Uses" "HTTPS"
        admin     -> zed.spa "Uses" "HTTPS"
        zed.web -> zed.spa "Delivers SPA bundle" "HTTPS"
        zed.spa -> zed.storage "Uploads / downloads files" "HTTPS, pre-signed URLs"
        zed.backend -> zed.storage "Stores & signs files" "S3 API"
        zed.backend -> zed.db "Reads / writes" "SQL / TCP"
        zed.backend -> sms "Sends OTP & notifications" "HTTPS API"
        zed.backend -> kyc "Inquires identity data" "HTTPS API"

        # ---- Component level (Web SPA - Workspace feature) ----
        zed.spa.page  -> zed.spa.chat  "Renders"
        zed.spa.page  -> zed.spa.deliv "Renders"
        zed.spa.page  -> zed.spa.tasks "Renders"
        zed.spa.page  -> zed.spa.agree "Renders"
        zed.spa.page  -> zed.spa.perm  "Checks capabilities"
        zed.spa.chat  -> zed.spa.store "Drafts, unread, typing"
        zed.spa.chat  -> zed.spa.hooks "Queries / mutates"
        zed.spa.deliv -> zed.spa.hooks "Queries / mutates"
        zed.spa.tasks -> zed.spa.hooks "Queries / mutates"
        zed.spa.agree -> zed.spa.hooks "Queries / mutates"
        zed.spa.rt    -> zed.spa.store "Updates presence & unread"
        zed.spa.rt    -> zed.spa.hooks "Patches query cache"
        zed.spa.rt    -> zed.spa.socket "Subscribes to project:{id} channel"
        zed.spa.hooks -> zed.spa.api "Calls"
        zed.spa.hooks -> zed.spa.upload "Uploads files before submit"
        zed.spa.upload -> zed.spa.api "Requests pre-signed URL"
        zed.spa.api   -> zed.spa.http "Uses"
        zed.spa.http   -> zed.backend "API requests" "REST/JSON, HTTPS"
        zed.spa.socket -> zed.backend "Live events" "WebSocket, WSS"
        zed.spa.upload -> zed.storage "PUT file" "HTTPS, pre-signed URL"

        # ---- Deployment ----
        production = deploymentEnvironment "Production" {
            deploymentNode "User's device" "" "Web browser" {
                containerInstance zed.spa
            }
            deploymentNode "Cloudflare" "DNS, TLS and SSH tunnel for CI" "Cloudflare" {
                infrastructureNode "Cloudflare Edge" "Public domains and TLS termination"
            }
            deploymentNode "Production Server" "Shared Docker network: web" "Linux, Docker Engine" {
                infrastructureNode "Reverse Proxy" "Routes main domain to frontend and api. domain + /ws to backend. Technology: TBD" "TBD"
                deploymentNode "frontend" "Image ghcr.io/<org>/frontend" "Docker: node:20-alpine + serve :3000" {
                    containerInstance zed.web
                }
                deploymentNode "backend" "Image ghcr.io/<org>/backend" "Docker: Go / Gin binary" {
                    containerInstance zed.backend
                }
                deploymentNode "postgres" "Persistent volume" "Docker: PostgreSQL" {
                    containerInstance zed.db
                }
                deploymentNode "minio" "Persistent volume" "Docker: MinIO" {
                    containerInstance zed.storage
                }
            }
        }
    }

    views {
        systemContext zed "SystemContext" "Zedlancer - System Context (C4 Level 1)" {
            include *
            autoLayout tb
        }

        container zed "Containers" "Zedlancer - Containers (C4 Level 2)" {
            include *
            autoLayout tb
        }

        component zed.spa "WorkspaceComponents" "Web SPA - Collaboration Workspace feature (C4 Level 3)" {
            include *
            autoLayout tb
        }

        deployment zed "Production" "Production" "Zedlancer - Production deployment" {
            include *
            autoLayout lr
        }

        styles {
            element "Element" {
                color #ffffff
                fontSize 22
            }
            element "Person" {
                shape Person
                background #08427b
                stroke #073b6f
            }
            element "Software System" {
                background #1168bd
            }
            element "External" {
                background #8c8c8c
            }
            element "Container" {
                background #438dd5
            }
            element "Browser" {
                shape WebBrowser
            }
            element "Database" {
                shape Cylinder
            }
            element "Storage" {
                shape Folder
            }
            element "Component" {
                background #85bbf0
                color #000000
            }
            element "Infrastructure Node" {
                background #ffffff
                color #1a1a1a
                stroke #438dd5
            }
            relationship "Relationship" {
                dashed true
                color #707070
            }
        }
    }
}
