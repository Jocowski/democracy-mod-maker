import React, { useState } from 'react';
import { Card, Typography, Button, Form, Input, Space, Tooltip, Select, InputNumber, Modal, message, Tabs } from 'antd';
import { PlusOutlined, QuestionCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ResizableTable from '../components/ResizableTable';
import './Policies.css';

const { Title } = Typography;
const { TabPane } = Tabs;

// Define languages in the specified order
const languages = [
  { code: 'English', name: 'English' },
  { code: 'PortugueseBR', name: 'Portuguese (Brazil)' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' },
  { code: 'Italian', name: 'Italian' },
  { code: 'Russian', name: 'Russian' },
  { code: 'Polish', name: 'Polish' },
  { code: 'Chinese', name: 'Chinese' },
  { code: 'Japanese', name: 'Japanese' },
  { code: 'Korean', name: 'Korean' },
  { code: 'Arabic', name: 'Arabic' }
];

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [form] = Form.useForm();
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Flags',
      dataIndex: 'flags',
      key: 'flags',
      width: 180,
      ellipsis: true,
      render: (flags) => (
        <span className={`policy-flags ${flags?.toLowerCase() || 'none'}`}>
          {flags || 'none'}
        </span>
      ),
    },
    {
      title: 'Opposites',
      dataIndex: 'opposites',
      key: 'opposites',
      width: 200,
      ellipsis: true,
      render: (opposites) => (
        <span className="policy-opposites">
          {opposites || 'None'}
        </span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 150,
      ellipsis: true,
      render: (department) => (
        <span className={`policy-department ${department?.toLowerCase() || 'none'}`}>
          {department || 'None'}
        </span>
      ),
    },
    {
      title: 'MinCost',
      dataIndex: 'minCost',
      key: 'minCost',
      width: 100,
      ellipsis: true,
      render: (minCost) => (
        <span className="policy-cost">
          {minCost || 0}
        </span>
      ),
    },
    {
      title: 'MaxCost',
      dataIndex: 'maxCost',
      key: 'maxCost',
      width: 100,
      ellipsis: true,
      render: (maxCost) => (
        <span className="policy-cost">
          {maxCost || 0}
        </span>
      ),
    },
    {
      title: 'CostFunction',
      dataIndex: 'costFunction',
      key: 'costFunction',
      width: 200,
      ellipsis: true,
      render: (costFunction) => (
        <span className="policy-cost-function">
          {costFunction || 'Linear'}
        </span>
      ),
    },
    {
      title: 'MinIncome',
      dataIndex: 'minIncome',
      key: 'minIncome',
      width: 100,
      ellipsis: true,
      render: (minIncome) => (
        <span className="policy-income">
          {minIncome || 0}
        </span>
      ),
    },
    {
      title: 'MaxIncome',
      dataIndex: 'maxIncome',
      key: 'maxIncome',
      width: 100,
      ellipsis: true,
      render: (maxIncome) => (
        <span className="policy-income">
          {maxIncome || 0}
        </span>
      ),
    },
    {
      title: 'IncomeFunction',
      dataIndex: 'incomeFunction',
      key: 'incomeFunction',
      width: 200,
      ellipsis: true,
      render: (incomeFunction) => (
        <span className="policy-income-function">
          {incomeFunction || 'Linear'}
        </span>
      ),
    },
    {
      title: 'Introduce',
      dataIndex: 'introduce',
      key: 'introduce',
      width: 100,
      ellipsis: true,
      render: (introduce) => (
        <span className="policy-cost">
          {introduce || 0}
        </span>
      ),
    },
    {
      title: 'Cancel',
      dataIndex: 'cancel',
      key: 'cancel',
      width: 100,
      ellipsis: true,
      render: (cancel) => (
        <span className="policy-cost">
          {cancel || 0}
        </span>
      ),
    },
    {
      title: 'Raise',
      dataIndex: 'raise',
      key: 'raise',
      width: 100,
      ellipsis: true,
      render: (raise) => (
        <span className="policy-cost">
          {raise || 0}
        </span>
      ),
    },
    {
      title: 'Lower',
      dataIndex: 'lower',
      key: 'lower',
      width: 100,
      ellipsis: true,
      render: (lower) => (
        <span className="policy-cost">
          {lower || 0}
        </span>
      ),
    },
    {
      title: 'Implementation',
      dataIndex: 'implementation',
      key: 'implementation',
      width: 120,
      ellipsis: true,
      render: (implementation) => (
        <span className="policy-implementation">
          {implementation || 0}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditPolicy(record)}
            className="edit-policy-button"
          />
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePolicy(record)}
            className="delete-policy-button"
          />
        </Space>
      ),
    },
  ];

  const handleCreatePolicy = (values) => {
    // Handle custom cost function
    let costFunction = values.costFunction || '0+(1.0*x)';
    if (values.costFunction === 'custom' && values.customCostFunction) {
      costFunction = values.customCostFunction;
    }
    
    // Handle custom income function
    let incomeFunction = values.incomeFunction || '0+(1.0*x)';
    if (values.incomeFunction === 'custom' && values.customIncomeFunction) {
      incomeFunction = values.customIncomeFunction;
    }
    
    // Extract translations data
    const translations = {};
    languages.forEach(lang => {
      translations[lang.code] = {
        name: values[`translation_name_${lang.code}`] || '',
        description: values[`translation_description_${lang.code}`] || ''
      };
    });

    const newPolicy = {
      name: values.policyName,
      flags: values.flags || 'none',
      opposites: values.opposites ? values.opposites.join(', ') : '',
      department: values.department || '',
      minCost: values.minCost || 0,
      maxCost: values.maxCost || 0,
      costFunction: costFunction,
      minIncome: values.minIncome || 0,
      maxIncome: values.maxIncome || 0,
      incomeFunction: incomeFunction,
      introduce: values.introduce || 0,
      cancel: values.cancel || 0,
      raise: values.raise || 0,
      lower: values.lower || 0,
      implementation: values.implementation || 0,
      translations: translations,
    };

    if (editingPolicy) {
      // Update existing policy
      setPolicies(policies.map(policy => 
        policy.name === editingPolicy.name ? newPolicy : policy
      ));
      setEditingPolicy(null);
      message.success('Policy updated successfully!');
    } else {
      // Create new policy
      setPolicies([...policies, newPolicy]);
      message.success('Policy created successfully!');
    }
    
    form.resetFields();
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    
    // Populate form with existing policy data
    const oppositesArray = policy.opposites ? policy.opposites.split(', ').filter(Boolean) : [];
    const isCustomCostFunction = !['0+(1.0*x)', '1.0*(x^4)'].includes(policy.costFunction);
    const isCustomIncomeFunction = !['0+(1.0*x)', '1.0*(x^4)'].includes(policy.incomeFunction);
    
    // Prepare form values including translations
    const formValues = {
      policyName: policy.name,
      flags: policy.flags === 'none' ? undefined : policy.flags,
      opposites: oppositesArray,
      department: policy.department || undefined,
      minCost: policy.minCost,
      maxCost: policy.maxCost,
      costFunction: isCustomCostFunction ? 'custom' : policy.costFunction,
      customCostFunction: isCustomCostFunction ? policy.costFunction : undefined,
      minIncome: policy.minIncome,
      maxIncome: policy.maxIncome,
      incomeFunction: isCustomIncomeFunction ? 'custom' : policy.incomeFunction,
      customIncomeFunction: isCustomIncomeFunction ? policy.incomeFunction : undefined,
      introduce: policy.introduce,
      cancel: policy.cancel,
      raise: policy.raise,
      lower: policy.lower,
      implementation: policy.implementation,
    };

    // Add translation values if they exist
    if (policy.translations) {
      languages.forEach(lang => {
        if (policy.translations[lang.code]) {
          formValues[`translation_name_${lang.code}`] = policy.translations[lang.code].name || '';
          formValues[`translation_description_${lang.code}`] = policy.translations[lang.code].description || '';
        }
      });
    }

    form.setFieldsValue(formValues);

    // Scroll to form
    const formElement = document.querySelector('.create-policy-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDeletePolicy = (policy) => {
    setPolicyToDelete(policy);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setPolicies(policies.filter(policy => policy.name !== policyToDelete.name));
    setDeleteModalVisible(false);
    setPolicyToDelete(null);
    message.success('Policy deleted successfully!');
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setPolicyToDelete(null);
  };

  const handleCancelEdit = () => {
    setEditingPolicy(null);
    form.resetFields();
  };

  const renderTranslationsForm = () => {
    return (
      <div className="translations-form">
        <div className="translations-grid">
          {languages.map(lang => (
            <div key={lang.code} className="language-section">
              <div className="language-header">
                <Title level={5} style={{ color: '#1565c0', margin: 0 }}>
                  {lang.name}
                </Title>
              </div>
              <div className="language-fields">
                <Form.Item
                  name={`translation_name_${lang.code}`}
                  label="Policy Name"
                  rules={[
                    { required: lang.code === 'English', message: 'English policy name is required!' }
                  ]}
                >
                  <Input
                    placeholder={`Enter policy name in ${lang.name}`}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                
                <Form.Item
                  name={`translation_description_${lang.code}`}
                  label="Policy Description"
                >
                  <Input.TextArea
                    placeholder={`Enter policy description in ${lang.name}`}
                    rows={3}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="policies-container">
      <div className="policies-header">
        <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
          Policies Management
        </Title>
      </div>

          <Card className="create-policy-card">
            <div className="create-policy-header">
              <div className="header-content">
                <Title level={4} style={{ color: '#1565c0', margin: 0 }}>
                  {editingPolicy ? `Edit Policy: ${editingPolicy.name}` : 'Create New Policy'}
                </Title>
                {editingPolicy && (
                  <Button 
                    onClick={handleCancelEdit}
                    className="cancel-edit-button"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </div>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleCreatePolicy}
              className="create-policy-form"
            >
              <Tabs defaultActiveKey="data" className="policy-form-tabs">
                <TabPane tab="Data" key="data">
                  {/* Basic Information Section */}
                  <div className="form-section">
                    <div className="section-header">
                      <Title level={5} style={{ color: '#1565c0', margin: 0 }}>
                        Basic Information
                      </Title>
                    </div>
                    <div className="section-content">
                      <div className="basic-info-row">
                        <Form.Item
                          name="policyName"
                          label={
                            <span>
                              Policy Name
                              <Tooltip title="This is the internal policy identifier used by the game engine. It's not visible to players but is required for the game to recognize and reference this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                          rules={[
                            { required: true, message: 'Please enter policy name!' },
                            { min: 1, message: 'Policy name cannot be empty!' }
                          ]}
                        >
                          <Input
                            placeholder="Enter policy name"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="department"
                          label={
                            <span>
                              Department
                              <Tooltip title="Decides which 'zone' on the screen the icon for this policy will appear in, which category on the new policies screen it will be listed under, and also which cabinet minister will be in charge of the policy, and thus affect the efficiency with which it is implemented.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <Select
                            placeholder="Select department"
                            style={{ width: '100%' }}
                            allowClear
                          >
                            <Select.Option value="FOREIGNPOLICY">FOREIGNPOLICY</Select.Option>
                            <Select.Option value="WELFARE">WELFARE</Select.Option>
                            <Select.Option value="ECONOMY">ECONOMY</Select.Option>
                            <Select.Option value="TAX">TAX</Select.Option>
                            <Select.Option value="PUBLICSERVICES">PUBLICSERVICES</Select.Option>
                            <Select.Option value="LAWANDORDER">LAWANDORDER</Select.Option>
                            <Select.Option value="TRANSPORT">TRANSPORT</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {/* Policy Behavior Section */}
                  <div className="form-section">
                    <div className="section-header">
                      <Title level={5} style={{ color: '#1565c0', margin: 0 }}>
                        Policy Behavior
                      </Title>
                    </div>
                    <div className="section-content">
                      <div className="policy-behavior-row">
                        <Form.Item
                          name="flags"
                          label={
                            <span>
                              Flags
                              <Tooltip title="UNCANCELLABLE: Cancel button is disabled, policy always implemented at 0.5 strength. MULTIPLYINCOME: Policy income inputs are multiplied instead of added.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <Select
                            placeholder="Select flags"
                            style={{ width: '100%' }}
                            allowClear
                          >
                            <Select.Option value="none">None</Select.Option>
                            <Select.Option value="UNCANCELLABLE">UNCANCELLABLE</Select.Option>
                            <Select.Option value="MULTIPLYINCOME">MULTIPLYINCOME</Select.Option>
                          </Select>
                        </Form.Item>
                        
                        <Form.Item
                          name="opposites"
                          label={
                            <span>
                              Opposites
                              <Tooltip title="Comma-separated list of policies that conflict with this one. Conflicting policies are automatically cancelled when this policy is implemented.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select conflicting policies"
                            style={{ width: '100%' }}
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {policies.map(policy => (
                              <Select.Option key={policy.name} value={policy.name}>
                                {policy.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {/* Cost Configuration Section */}
                  <div className="form-section">
                    <div className="section-header">
                      <Title level={5} style={{ color: '#1565c0', margin: 0 }}>
                        Cost Configuration
                      </Title>
                    </div>
                    <div className="section-content">
                      <div className="cost-inputs-row">
                        <Form.Item
                          name="minCost"
                          label={
                            <span>
                              MinCost
                              <Tooltip title="The cost of the policy per turn at a level of 0 on the slider. This is a fixed value, which then gets multiplied by a set multiplier for each country and adjusted for ministerial competence to get an actual cost for this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="maxCost"
                          label={
                            <span>
                              MaxCost
                              <Tooltip title="The cost of the policy per turn at maximum level on the slider. This is a fixed value, which then gets multiplied by a set multiplier for each country and adjusted for ministerial competence to get an actual cost for this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </div>
                      
                      <div className="cost-function-row">
                        <Form.Item
                          name="costFunction"
                          label={
                            <span>
                              CostFunction
                              <Tooltip title="The equation determining how costs are calculated at a base level. Choose from predefined functions or enter a custom equation using 'x' as the variable.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <Select
                            placeholder="Select cost function"
                            style={{ width: '100%' }}
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option value="0+(1.0*x)">Linear Cost Function: 0+(1.0*x)</Select.Option>
                            <Select.Option value="1.0*(x^4)">Quartic Cost Function: 1.0*(x^4)</Select.Option>
                            <Select.Option value="custom">Custom Function</Select.Option>
                          </Select>
                        </Form.Item>
                        
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) => 
                            prevValues.costFunction !== currentValues.costFunction
                          }
                        >
                          {({ getFieldValue }) => {
                            const costFunction = getFieldValue('costFunction');
                            return costFunction === 'custom' ? (
                              <Form.Item
                                name="customCostFunction"
                                label={
                                  <span>
                                    Custom Function
                                    <Tooltip title="Enter a custom cost function equation using 'x' as the variable. Example: 0.5+(0.8*x^2)">
                                      <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                                    </Tooltip>
                                  </span>
                                }
                                rules={[
                                  { required: true, message: 'Please enter a custom function!' }
                                ]}
                              >
                                <Input
                                  placeholder="e.g., 0.5+(0.8*x^2)"
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            ) : null;
                          }}
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {/* Income Configuration Section */}
                  <div className="form-section">
                    <div className="section-header">
                      <Title level={5} style={{ color: '#1565c0', margin: 0 }}>
                        Income Configuration
                      </Title>
                    </div>
                    <div className="section-content">
                      <div className="income-inputs-row">
                        <Form.Item
                          name="minIncome"
                          label={
                            <span>
                              MinIncome
                              <Tooltip title="The income of the policy per turn at a level of 0 on the slider. This is a fixed value, which then gets multiplied by a set multiplier for each country and adjusted for ministerial competence to get an actual income for this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="maxIncome"
                          label={
                            <span>
                              MaxIncome
                              <Tooltip title="The income of the policy per turn at maximum level on the slider. This is a fixed value, which then gets multiplied by a set multiplier for each country and adjusted for ministerial competence to get an actual income for this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </div>
                      
                      <div className="income-function-row">
                        <Form.Item
                          name="incomeFunction"
                          label={
                            <span>
                              IncomeFunction
                              <Tooltip title="The equation determining how income is calculated, at a base level. Best to leave this at 0+(1.0*x) to get a nice smooth linear increase in income as the slider goes from 0 to 1.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <Select
                            placeholder="Select income function"
                            style={{ width: '100%' }}
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option value="0+(1.0*x)">Linear Income Function: 0+(1.0*x)</Select.Option>
                            <Select.Option value="1.0*(x^4)">Quartic Income Function: 1.0*(x^4)</Select.Option>
                            <Select.Option value="custom">Custom Function</Select.Option>
                          </Select>
                        </Form.Item>
                        
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) => 
                            prevValues.incomeFunction !== currentValues.incomeFunction
                          }
                        >
                          {({ getFieldValue }) => {
                            const incomeFunction = getFieldValue('incomeFunction');
                            return incomeFunction === 'custom' ? (
                              <Form.Item
                                name="customIncomeFunction"
                                label={
                                  <span>
                                    Custom Function
                                    <Tooltip title="Enter a custom income function equation using 'x' as the variable. Example: 0.5+(0.8*x^2)">
                                      <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                                    </Tooltip>
                                  </span>
                                }
                                rules={[
                                  { required: true, message: 'Please enter a custom function!' }
                                ]}
                              >
                                <Input
                                  placeholder="e.g., 0.5+(0.8*x^2)"
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            ) : null;
                          }}
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {/* Political Capital Section */}
                  <div className="form-section">
                    <div className="section-header">
                      <Title level={5} style={{ color: '#1565c0', margin: 0 }}>
                        Political Capital Costs
                      </Title>
                    </div>
                    <div className="section-content">
                      <div className="political-capital-grid">
                        <Form.Item
                          name="introduce"
                          label={
                            <span>
                              Introduce
                              <Tooltip title="Amount of political capital required to introduce this as a new policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="cancel"
                          label={
                            <span>
                              Cancel
                              <Tooltip title="Amount of political capital required to cancel this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="raise"
                          label={
                            <span>
                              Raise
                              <Tooltip title="Amount of political capital required to raise the current slider level once it's implemented.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="lower"
                          label={
                            <span>
                              Lower
                              <Tooltip title="Amount of political capital required to lower the current slider level once it's implemented.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="implementation"
                          label={
                            <span>
                              Implementation
                              <Tooltip title="How many turns it will take for this policy to be fully implemented (or cancelled). This will be adjusted in practice for the competence of the minister in charge of this policy.">
                                <QuestionCircleOutlined style={{ marginLeft: 4, color: '#1976d2' }} />
                              </Tooltip>
                            </span>
                          }
                        >
                          <InputNumber
                            placeholder="0"
                            min={0}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </TabPane>

                <TabPane tab="Translations" key="translations">
                  {renderTranslationsForm()}
                </TabPane>
              </Tabs>

              {/* Submit Button */}
              <div className="form-submit-section">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={editingPolicy ? <EditOutlined /> : <PlusOutlined />}
                    className="create-policy-button"
                    size="large"
                  >
                    {editingPolicy ? 'Update Policy' : 'Create Policy'}
                  </Button>
                </Form.Item>
              </div>
            </Form>
      </Card>
      
      <Card className="policies-table-card">
        <ResizableTable
          columns={columns}
          dataSource={policies}
          rowKey="name"
          scroll={{ x: 1800, y: '60vh' }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} policies`,
          }}
          size="small"
          bordered
          className="policies-management-table"
        />
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div className="delete-modal-header">
            <DeleteOutlined className="delete-modal-icon" />
            <span>Delete Policy</span>
          </div>
        }
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete Policy"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true,
          size: 'large',
          className: 'delete-confirm-button'
        }}
        cancelButtonProps={{
          size: 'large',
          className: 'delete-cancel-button'
        }}
        className="delete-confirmation-modal"
        width={480}
        centered
      >
        <div className="delete-modal-content">
          <div className="delete-warning-icon">
            <DeleteOutlined />
          </div>
          <div className="delete-modal-text">
            <h3>Are you sure you want to delete this policy?</h3>
            <div className="policy-to-delete">
              <span className="policy-label">Policy Name:</span>
              <span className="policy-name">"{policyToDelete?.name}"</span>
            </div>
            <div className="delete-warning">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">This action cannot be undone and will permanently remove the policy from your list.</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Policies;
