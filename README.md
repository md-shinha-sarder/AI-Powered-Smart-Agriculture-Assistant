# AI-Powered-Smart-Agriculture-Assistant

**Crop Disease Detection and Intelligent Farming Recommendation System**

| | |
|---|---|
| **Course** | CSE 4104 – Software Development III |
| **Official Team Name** | CSE4104-7E-T11 |
| **Section** | 7E |
| **Repository** | [md-shinha-sarder/AI-Powered-Smart-Agriculture-Assistant](https://github.com/md-shinha-sarder/AI-Powered-Smart-Agriculture-Assistant) |

---

## Project Description

The AI-Powered Smart Agriculture Assistant is a web application designed to help farmers identify possible plant-leaf diseases and access practical crop-care guidance. A user can upload or capture a photograph of a plant leaf and select the crop. The system analyzes the image and provides a likely disease identification (or a healthy result) along with a confidence level, a brief explanation of visible symptoms, and basic prevention and care tips.

The application also provides general crop guidance, including fertilizer, watering, and cultivation tips. A chat assistant supports common farming questions, while registered users can save previous diagnoses and review them later.

The initial version focuses on a limited set of crops commonly grown in Bangladesh and provides a simple, Bangla-friendly interface. Results are intended as early information, not a substitute for professional diagnosis. When an image is unclear or confidence is low, the application advises the user to consult a local agricultural extension officer before taking action, particularly before using pesticides.

---

## Team Information

| Field | Details |
|---|---|
| Official Team Name | CSE4104-7E-T11 |
| Course | CSE 4104 – Software Development III |
| Section | 7E |
| Project Title | AI-Powered Smart Agriculture Assistant: Crop Disease Detection and Intelligent Farming Recommendation System |
| Team Leader | Md Hanif Sheikh (11230321379) |

### Team Members

| SL | Name | Student ID | Role |
|---|---|---|---|
| 1 | Md Hanif Sheikh | 11230321379 | Team Leader |
| 2 | Md Shinha Sarder | 11230321372 | Member |
| 3 | Md Haris Sheikh | 11230321378 | Member |

---

## Proposed Features

- **Leaf image upload or capture:** Submit a plant-leaf photograph for analysis.
- **Crop selection:** Identify which crop is shown in the image.
- **AI-based disease detection:** Return a likely disease or a healthy-plant result.
- **Confidence level:** Display the model's confidence with the result.
- **Symptom explanation:** Short, understandable explanation of the symptoms identified.
- **Prevention and care tips:** Simple, relevant steps for plant care and disease prevention.
- **Farming recommendations:** Basic fertilizer, watering, and cultivation guidance.
- **Farming chat assistant:** Answers common farming questions.
- **Diagnosis history:** Save diagnoses and view them later.
- **Bangla-friendly interface:** Accessible to Bangladeshi farmers.
- **Low-confidence guidance:** Recommends consulting a local agricultural extension officer when an image is unclear or the result has low confidence.

---

## Technology Stack

| Layer | Proposed Technologies |
|---|---|
| Frontend | React (or Next.js), Tailwind CSS |
| Backend | Node.js, Express.js |
| Authentication | JWT, bcrypt |
| API | REST APIs |
| Database | PostgreSQL |
| Image Storage | Supabase Storage or Cloudinary |
| AI and Image Analysis | Google Gemini API (multimodal) |
| Knowledge Base | Curated seed database of Bangladeshi crops and diseases |

> The frontend framework and image-storage service are alternatives under consideration in the initial project plan.

---

## Why AI Is Needed

Many crop diseases have similar visual symptoms, and farmers may not be able to consult an agricultural expert quickly. A fixed rule-based program may struggle with variations in leaf colour, spot patterns, lighting, and image backgrounds. A multimodal AI model can analyze visual symptoms in a submitted photograph and explain its findings in plain language. The application combines AI analysis with a curated crop-knowledge database to provide locally relevant guidance.

AI predictions can be incorrect. For this reason, the application shows a confidence level and recommends expert checking when the result is uncertain.

---

## Scope and Limitations

- The first version supports a limited selection of crops and diseases.
- The application is an early-information and guidance tool; it does not replace professional agricultural diagnosis.
- It does not provide chemical dosages.
- Unclear images or low-confidence results should be checked with a local agricultural extension officer.
- The initial knowledge base and recommendations focus on crops commonly grown in Bangladesh.

---

## Similar Existing Systems and Research

| System / Research | What it does | Gap addressed by this project |
|---|---|---|
| Plantix | Provides photo-based crop diagnosis and treatment suggestions. | Targets a smaller set of Bangladeshi crops and adds web-based diagnosis history and local learning content. |
| YOLOv8 Bangladeshi crops study (Abid et al., 2024) | Detects diseases in five Bangladeshi crops. | Adds a farmer-focused workflow, Bangla explanations, and care tips. |
| PlantVillage (Mohanty et al., 2016) | Provides a public leaf-image dataset for training models. | Develops an application with user accounts, diagnosis history, and guidance. |
| PlantDoc (Singh et al., 2020) | Provides a dataset with real-world field backgrounds. | Builds a usable web application and warns that field-photo conditions can reduce accuracy. |
| GreenAid (2026) | Uses deep-learning detection with a dashboard and chatbot. | Develops a scoped prototype with local crops and a Bangladesh-focused knowledge base. |

---

## References

1. Plantix. *Crop Diagnosis and Treatments*. https://plantix.net/en/
2. Abid, Z., et al. (2024). *Bangladeshi crops leaf disease detection using YOLOv8*. Heliyon, 10(18), e36694.
3. Mohanty, S. P., Hughes, D. P., & Salathé, M. (2016). *Using deep learning for image-based plant disease detection*. Frontiers in Plant Science, 7, 1419.
4. Singh, D., et al. (2020). *PlantDoc: A dataset for visual plant disease detection*. https://github.com/pratikkayal/PlantDoc-Dataset
5. *GreenAid: a confidence-weighted ensemble deep learning system for real-time plant disease detection and management*. Scientific Reports (2026).
