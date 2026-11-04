"""Build the downloadable resume from verified content/ sources."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import pypdfium2 as pdfium

out=Path('public/Justin-Ames-Resume.pdf');out.parent.mkdir(exist_ok=True)
c=canvas.Canvas(str(out),pagesize=(612,792));c.setTitle('Justin Ames - Mechanical Engineering Resume');c.setAuthor('Justin Ames')
ink=HexColor('#242c28');muted=HexColor('#566050');line=HexColor('#bdc5b4')
style=ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=12,textColor=ink)
y=748
c.setFillColor(ink);c.setFont('Helvetica-Bold',25);c.drawString(44,y,'JUSTIN AMES');y-=21
c.setFont('Helvetica',9.5);c.drawString(44,y,'Mechanical Engineering | The George Washington University');y-=17
c.setFillColor(muted);c.setFont('Helvetica',8.5);c.drawString(44,y,'401-714-6155  |  amesjj1234@gmail.com  |  linkedin.com/in/ames-justin');y-=13

def paragraph(text):
 global y
 p=Paragraph(text,style);w,h=p.wrap(524,1000);p.drawOn(c,44,y-h);y-=h+4

def section(title):
 global y
 y-=12;c.setStrokeColor(line);c.line(44,y+5,568,y+5);c.setFillColor(ink);c.setFont('Helvetica-Bold',9);c.drawString(44,y-7,title);y-=19

def role(title,date):
 global y
 c.setFillColor(ink);c.setFont('Helvetica-Bold',9.3);c.drawString(44,y-9,title);c.setFont('Helvetica',8.5);c.setFillColor(muted);c.drawRightString(568,y-9,date);y-=15

section('EDUCATION')
role('The George Washington University - Washington, DC','Expected May 2027')
paragraph('Bachelor of Science in Mechanical Engineering')
role('Barrington High School - Barrington, RI','June 2023')
paragraph('Pre-Engineering Career and Technical Education Pathway')
section('TECHNICAL SKILLS')
paragraph('<b>Design and analysis:</b> SolidWorks, AutoCAD, MATLAB, Python, Excel, CAD assemblies, engineering experimentation.<br/><b>Manufacturing:</b> Turning, milling, CNC/NC, aluminum machining, 3D printing, surface finishing, dimensioning, tolerancing, and shop safety.')
section('SELECTED ENGINEERING PROJECTS')
role('GW Rocket Mars Rover - Rover Design Lead','2026 - 2027 | In progress')
paragraph('Lead rover mechanical design and fabrication within a four-person capstone team. Lead rover fixturing design and assist with control-system design for a deployable rover-container payload.')
role('Oscillating Fan Design - CAD and Analysis','Completed coursework')
paragraph('Led the SolidWorks assembly and gear-train CAD design for a team desktop fan project. Integrated teammates\' components, conducted motion studies and analysis, and used FEA on the assembly and individual components to support analytical findings.')
role('Manufacturing Design Project - Team Lead','Fall 2024')
paragraph('Led a four-student team through planning and manufacturing an aluminum grabber. Designed shaft and handle-housing backings in CAD; shared machining, solved in-shop problems, and coordinated team meetings.')
section('ENGINEERING AND WORK EXPERIENCE')
role('Ocean State Spearguns - Apprenticeship','July 2022 - June 2023')
paragraph('Worked with the owner to craft a custom speargun, using precision woodworking, stress analysis, and buoyancy analysis.')
role('iCreate Lab - Co-President','August 2021 - June 2023')
paragraph('Maintained and operated 3D printers, VR technology, a smart board, and a vinyl cutter. Oversaw a 15-person intern team and assigned tasks.')
role('Bluewater Bar and Grill - Barrington, RI','2021 - 2025')
paragraph('Expo, station cook, dishwasher, and server. Promoted three times; coordinated orders and plate timing with line cooks in a busy restaurant.')
role("Diego's, Inked Restaurant Group - Newport, RI",'June - August 2025')
paragraph('Server in a high-pressure environment; communicated with coworkers to support customer service.')
section('LEADERSHIP AND COMMUNITY')
role('Kappa Sigma, George Washington University','September 2024 - Present')
paragraph('Philanthropy Chair and Scribe. Organize events involving roughly 150 participants to raise money for veterans charities; maintain chapter records and communicate with national headquarters.')
role('Miriam Hospital - Kitchen Volunteer','2022 - 2023')
paragraph('Delivered and helped prepare patient meals. Trained new volunteers in food preparation, safety, and kitchen procedures.')
section('INTERESTS')
paragraph('Spearfishing, skiing, 3D design and printing, guitar, Spanish, cooking, and music.')
assert y>25, f'Resume content overflow: {y}'
c.save()
d=pdfium.PdfDocument(str(out));d[0].render(scale=1.5).to_pil().save('.work/resume-preview.png')
print('Resume created; bottom baseline:',y)
